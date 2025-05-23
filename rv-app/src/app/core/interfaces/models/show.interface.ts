import { IRider } from "./rider.interface";
import { IUser } from "./user.interface";

export interface IShow {
	id: string;
	name: string;
	year: number;
	synopsis: string;
	imgs: {	
        rider_img_xl: string;
		rider_img_sm: string; 
		rider_img_logo: string;

    };
}

export interface IFavShow{
	show: IShow
	fav_rider_1: IRider
	fav_rider_2: IRider
	fav_rider_3: IRider
	show_review: string
}