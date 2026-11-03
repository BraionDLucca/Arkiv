from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permite leitura para qualquer requisição segura,
    mas alterações apenas pelo proprietário do recurso.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if not request.user or not request.user.is_authenticated:
            return False

        if hasattr(obj, 'autor'):
            return obj.autor == request.user

        if hasattr(obj, 'usuario'):
            return obj.usuario == request.user

        if hasattr(obj, 'plano'):
            return obj.plano.autor == request.user

        if hasattr(obj, 'modulo'):
            return obj.modulo.plano.autor == request.user

        if hasattr(obj, 'capitulo'):
            return obj.capitulo.modulo.plano.autor == request.user

        return False
