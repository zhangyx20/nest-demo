/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from "mongoose";
export declare class Coffee extends Document {
    name: string;
    brand: string;
    flavors: string[];
}
export declare const CoffeeSchema: import("mongoose").Schema<Coffee, import("mongoose").Model<Coffee, any, any, any>, {}, {}>;
