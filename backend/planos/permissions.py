from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user or not request.user.is_authenticated:
            return False
        if hasattr(obj, "autor_id"):
            return obj.autor_id == request.user.id
        if hasattr(obj, "usuario_id"):
            return obj.usuario_id == request.user.id
        if hasattr(obj, "plano_id"):
            return obj.plano.autor_id == request.user.id
        if hasattr(obj, "modulo_id"):
            return obj.modulo.plano.autor_id == request.user.id
        if hasattr(obj, "capitulo_id"):
            return obj.capitulo.modulo.plano.autor_id == request.user.id
        return False
