def upload_img_factory(categoria: str) -> function:
    def upload_img(instance: any, filename):
        return f"{categoria}/{instance.id}/{instance.id}"
    return upload_img

