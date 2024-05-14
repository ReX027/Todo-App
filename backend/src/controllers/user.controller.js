import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/NodeMailer.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asynchandler(async (req, res) => {
  // res.status(200).json({
  //     message: "Welcome to complex Backend"
  // })
  // Steps:
  // get user details from front-end
  // Validation - not empty
  // check if user already exists : username , email
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  //1
  const { username, email, password } = req.body;

  //2
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  //3
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    if (existedUser.username === username.toLowerCase()) {
      throw new ApiError(409, "Username already exists");
    } else if (existedUser.email === email) {
      throw new ApiError(409, "Email already exists");
    }
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  //6
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //7
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  //8
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asynchandler(async (req, res) => {
  //steps:
  // get user details from front-end - username / email and password.
  // validation - not empty (username or email)
  // ckeck if user exist
  // password check
  // access and refresh token
  // send these tokens in cookies

  // 1.
  const { email, password } = req.body;

  //2.
  if (!email) {
    throw new ApiError(400, "username or email is required");
  }
  //3.
  const user = await User.findOne({ email });
  // const user = await User.findOne({
  //   $or: [{ username }, { email }],
  // });

  if (!user) {
    throw new ApiError(404, "user doesnot exist");
  }

  //4.
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "user doesnot exist");
  }

  //5.
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  //6.
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //6 for cookies
  const options = {
    httpOnly: false,
    secure: true,
  };
  // const data = { email, password };
  // return res.send(data);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully Done"
      )
    );
});

const logoutUser = asynchandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: false,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAcessToken = asynchandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired");
    }
    const options = {
      httpOnly: false,
      secure: true,
    };
    const { accessToken, newrefreshToken } =
      await generateAccessAndRefreshTokens(user._id);
    return res
      .status(200)
      .Cookie("accessToken", accessToken, options)
      .Cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newrefreshToken: newrefreshToken },
          "Access token is refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const forgotpassword = asynchandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid email address");
  }
  const { accessToken } = await generateAccessAndRefreshTokens(user._id);
  const sendmail = await sendEmail(
    email,
    "Reset your password",
    `Please visit this link to reset password: http://localhost:5173/reset-password/${user._id}`
  );

  //   const link = `http://localhost:${process.env.PORT}/api/v1/users/reset-password/${user._id}`;
  //   console.log("here is my link", link);
  // console.log("My access token is", accessToken);

  const options = {
    httpOnly: false,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken },
        "Do you want to change your password"
      )
    );
});
const resetpassword = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  //   console.log(req.params);
  const user = await User.findById(id);
  user.password = password;
  await user.save({ validateBeforeSave: false });
  if (!user) {
    throw new ApiError(400, "Unauthorized User");
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Password changed successfully"));
});

const changeCurrentPassword = asynchandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asynchandler(async (req, res) => {
  return res
    .status(200)
    .json(200, req.user, "current user fetched successfully");
});

const updateAccountDetails = asynchandler(async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "All fields are required");
  }
  const user = User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAcessToken,
  forgotpassword,
  resetpassword,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
};
