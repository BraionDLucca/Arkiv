from rest_framework import generics, permissions
from .serializers import RegisterSerializer, UsuarioPerfilSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class PerfilView(generics.RetrieveUpdateAPIView):
    serializer_class = UsuarioPerfilSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
