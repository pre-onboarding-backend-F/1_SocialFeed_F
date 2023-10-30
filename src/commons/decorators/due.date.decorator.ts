import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
	registerDecorator,
	ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class DateRangeValidator implements ValidatorConstraintInterface {
	validate(value: string, args: ValidationArguments) {
		if (!value) return false;

		const dueDay: number = args.constraints[0].dueDay;

		const inputDate = new Date(value);
		if (isNaN(inputDate.getTime())) return false;

		const today = new Date();

		const minDueDay = new Date();
		minDueDay.setDate(minDueDay.getDate() - dueDay);

		return inputDate >= minDueDay && inputDate <= today;
	}

	defaultMessage(args?: ValidationArguments): string {
		console.log('args.constraints :>> ', args.constraints);
		return `오늘 날짜 이전부터 최대 ${args.constraints[0].dueDay}일 내의 날짜만 조회 가능합니다.`;
	}
}

interface DateExpiryOptions {
	dueDay: number;
}

export function IsDueDate(options: DateExpiryOptions, validationOptions?: ValidationOptions) {
	return function (object: Record<string, any>, propertyName: string) {
		registerDecorator({
			name: 'isExpiryDate',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [options],
			options: validationOptions,
			validator: DateRangeValidator,
		});
	};
}
