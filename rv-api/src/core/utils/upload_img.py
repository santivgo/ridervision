
def upload_img(instance: any, filename):
    return f"{instance._meta_.model_name}/{instance.id}/{instance.id}"

