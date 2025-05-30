import { IShow } from "./show.interface"

export interface IRiderForm {
    id_form: number,
    name: string,
    id_rider: number
}

export interface IRider{
    id_rider: number,
    show: IShow
    name: string,
    main_user: string,
    forms: IRiderForm[],
    imgs: {
        rider_img_sm: string, // icone
        rider_img_bd: string, // full-body img
    }
    
}