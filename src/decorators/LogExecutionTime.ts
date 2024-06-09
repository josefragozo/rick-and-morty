import { Logger } from "@nestjs/common";

const logger = new Logger('logTime');

export function LogExecutionTime() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
  
      descriptor.value = async function (...args: any[]) {
        const start = Date.now();
        const result = await originalMethod.apply(this, args);
        const end = Date.now();
        const executionTime = end - start;
        Logger.log(`Method ${key} executed in ${executionTime}ms`, target.constructor.name);
        return result;
      };
  
      return descriptor;
    };
}