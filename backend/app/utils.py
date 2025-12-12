from fastapi import HTTPException

def assert_found(obj, msg="Not found"):
    if not obj:
        raise HTTPException(status_code=404, detail=msg)
    return obj