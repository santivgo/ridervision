from core.utils.get_meta_name import get_model_name


def uploadImg(instance, filename):
    modelName = getModelName(instance)
    if(instance):
        return f"{modelName}/{instance.id}/{filename}"
    else:
        return f"{modelName}/{filename}"