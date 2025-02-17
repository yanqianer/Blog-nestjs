// import { applyDecorators, Type } from '@nestjs/common';
// import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
// import { ResponseResult } from './ResponseResult';

// export const ApiResponseWrapper = <TModel extends Type<any>>(model: TModel) => {
//   return applyDecorators(
//     ApiExtraModels(ResponseResult, model), // 让 Swagger 识别 ResponseResult 和 model
//     ApiOkResponse({
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(ResponseResult) }, // 引用 ResponseResult 结构
//           {
//             properties: {
//               data: {
//                 $ref: getSchemaPath(model), // 让 data 部分是 model
//               },
//             },
//           },
//         ],
//       },
//     }),
//   );
// };  
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseResult } from './ResponseResult';

export const ApiResponseWrapper = <TModel extends Type<any>>(model: TModel, isArray = false) => {
  return applyDecorators(
    ApiExtraModels(ResponseResult, model), // 让 Swagger 识别 ResponseResult 和 model
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseResult) }, // 引用 ResponseResult 结构
          {
            properties: {
              data: isArray
                ? { type: 'array', items: { $ref: getSchemaPath(model) } } // 处理数组情况
                : { $ref: getSchemaPath(model) }, // 默认单个对象
            },
          },
        ],
      },
    }),
  );
};
