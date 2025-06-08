from core.utils.get_meta_name import getModelName


def uploadImg(instance: any):
    modelName = getModelName(instance)
    return f"{modelName}/{instance.id}/{instance.id}"
