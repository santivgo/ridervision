from core.utils.get_meta_name import get_model_name


def upload_img(instance, filename):
    model_name = get_model_name(instance)
    return f"{model_name}/{instance.id}/{filename}"
