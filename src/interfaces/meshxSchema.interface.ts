//==================================================================================================
// JSON Schema Draft 07
//==================================================================================================
// https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
//--------------------------------------------------------------------------------------------------

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type MeshXSchemaTypeName = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'null'

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type MeshXSchemaType = string | number | boolean | MeshXSchemaObject | MeshXSchemaArray | null

// Workaround for infinite type recursion
export interface MeshXSchemaObject {
    [key: string]: MeshXSchemaType
}

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export type MeshXSchemaArray = Array<MeshXSchemaType>

/**
 * Meta schema
 *
 * Recommended values:
 * - 'https://api.mesh-x.com/schema.json#'
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-5
 */
export type MeshXSchemaVersion = string

/**
 * MeshX Schema
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 */
export type MeshXSchemaDefinition = MeshXSchema | boolean
export interface MeshXSchema {
    $id?: string
    $ref?: string
    $mxRef?: string // This is a custom $ref
    $mxTypeRef?: string // typeId to get schema
    $schema?: MeshXSchemaVersion
    $comment?: string

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
     */
    type?: MeshXSchemaTypeName | MeshXSchemaTypeName[]
    enum?: MeshXSchemaType[]
    const?: MeshXSchemaType

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
     */
    multipleOf?: number
    maximum?: number
    exclusiveMaximum?: number
    minimum?: number
    exclusiveMinimum?: number

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
     */
    maxLength?: number
    minLength?: number
    pattern?: string

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
     */
    items?: MeshXSchemaDefinition | MeshXSchemaDefinition[]
    additionalItems?: MeshXSchemaDefinition
    maxItems?: number
    minItems?: number
    uniqueItems?: boolean
    contains?: MeshXSchema

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
     */
    maxProperties?: number
    minProperties?: number
    required?: string[]

    properties?: {
        [key: string]: MeshXSchemaDefinition
    }

    patternProperties?: {
        [key: string]: MeshXSchemaDefinition
    }

    additionalProperties?: MeshXSchemaDefinition

    dependencies?: {
        [key: string]: MeshXSchemaDefinition | string[]
    }

    propertyNames?: MeshXSchemaDefinition

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
     */
    if?: MeshXSchemaDefinition
    then?: MeshXSchemaDefinition
    else?: MeshXSchemaDefinition

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
     */
    allOf?: MeshXSchemaDefinition[]
    anyOf?: MeshXSchemaDefinition[]
    oneOf?: MeshXSchemaDefinition[]
    not?: MeshXSchemaDefinition

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
     */
    format?: string

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
     */
    contentMediaType?: string
    contentEncoding?: string

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
     */
    definitions?: {
        [key: string]: MeshXSchemaDefinition
    }

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
     */
    title?: string
    description?: string
    default?: MeshXSchemaType
    readOnly?: boolean
    writeOnly?: boolean
    examples?: MeshXSchemaType

    /**
     * @see https://api.mesh-x.com/v1/schema.json
     */
    mxType?: 'text' | 'number' | 'select' | 'multi-select' | 'switch' | 'datetime' | 'files' | 'relations' | 'action'
    mxUnit?: string
}
