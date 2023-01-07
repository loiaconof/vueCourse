interface Status {
    valid: boolean,
    message?: string
}

type Rule = (value: string) => Status

export function length({min, max}: {min:number, max:number}): Rule{
    return function (value:string): Status{
        const result = Boolean(value.length > min && value.length < max)
        
        return {
            valid: result,
            message: result ? undefined : `This filed must be between ${min} ands ${max}`
        }
    }
}

export const required: Rule = (value: string): Status => {
    const result = Boolean(value)

    return {
        valid: result,
        message: result ? undefined : 'This filed is required'
    }
}

export function validate(value: string, rules: Rule[]): Status{
    for(const rule of rules) {
        const result = rule(value)
        if(!result.valid) {
            return result
        }
    }

    return {
        valid: true
    }
}