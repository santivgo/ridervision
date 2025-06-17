import { IShow } from "./show.interface"

export interface IRider{
    id_rider: number,
    show: IShow
    url: string;
    name: string;
    main_user: string;
    rider_img_body: string;
    rider_img_sm: string;
    tv_show: string;   // full-body img    
}