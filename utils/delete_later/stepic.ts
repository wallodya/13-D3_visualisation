import { BlockLike } from "typescript";

interface IProduct {
    price: number;
    isNew: boolean;
    isSale: boolean;
    title: string;
}

interface IVehicle {
    wheels: number;
    year: number;
    brand: string;
}

interface ICar extends IProduct, IVehicle {
    type: string;
    model: string;
}

type Product = {
    price: number;
    isNew: boolean;
    isSale: boolean;
    title: string;
}

type Vehicle = {
    wheels: number;
    year: number;
    brand: string
}

type Car = {
    type: string;
    model: string;
} & Vehicle & Product
