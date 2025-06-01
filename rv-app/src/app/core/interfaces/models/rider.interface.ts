import { IShow } from "./show.interface"
export interface IRider{
    id_rider: number,
    show: IShow
    name: string,
    main_user: string,
    rider_img_sm: string, // icone
    rider_img_bd: string, // full-body img

    
}