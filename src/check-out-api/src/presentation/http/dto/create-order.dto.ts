import {Type} from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    IsUUID,
    Max,
    Min,
    ValidateNested,
} from "class-validator";


export class OrderItemDto {
    @IsUUID() productId!: string;
    @IsInt() @Min(1) @Max(999) quantity!: number;
}

export class CreateOrderDto {
    @IsUUID() orderId!: string;
    @IsString() @IsNotEmpty() fullName!: string;
    @IsEmail() email!: string;
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() => OrderItemDto)
    items!: OrderItemDto[];
}
