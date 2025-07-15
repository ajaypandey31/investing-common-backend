export const successResponse = (res:any, message:string, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  export const errorResponse = (res:any, message:string, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error
    });
  };
  