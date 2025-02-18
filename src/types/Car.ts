
export default interface Car {
    id?: number
    brand: string
    model: string
    color: string
    year:number
    regNumber: string
    imageUrl: string
    price: number
    dealer?:object
}
