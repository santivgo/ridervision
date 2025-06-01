import { IRider } from "./rider.interface";
import { IUser } from "./user.interface";

export interface IShow {
	id: string;
	name: string;
	year: number;
	synopsis: string;
	show_img_xl: string;
	show_img_sm: string; 
	show_img_banner: string;
	show_img_logo: string;
}

