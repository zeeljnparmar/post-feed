import { errorResponse } from './error.js';

export const validateFields = (req, res, requiredFields = []) => {
  const missing = [];
  const input=[]

  for (const field of requiredFields) {
    const value=req.body[field]
    if(value===undefined||value===""||value===null){
      missing.push(field)
      continue
    }
    if((field==="userId"||field==="limit")&&isNaN(value)){
      input.push({ field, expected: "number", received: typeof value });
    }
  }

  if (missing.length > 0) {
    errorResponse(res, 400, "Missing required fields Or invalid data", { missing });
    return false;
  }
  if (input.length > 0) {
    errorResponse(res, 400, "Invalid data type", { invalid: input });
    return false;
  }
  return true;
};
