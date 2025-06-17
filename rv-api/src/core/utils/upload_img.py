from core.utils.get_meta_name import getModelName

def uploadImg(instance, filename):
    modelName = getModelName(instance)
    return f"{modelName}/{instance.id}/{filename}"
