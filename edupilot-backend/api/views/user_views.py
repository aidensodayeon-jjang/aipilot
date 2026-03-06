from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import UserSerializer, UserLoginSerializer


class UserRegisterView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token = UserLoginSerializer.get_token(user)

            return Response({
                "username": user.username,
                "token": {
                    "access": str(token.access_token),
                    "refresh": str(token),
                },
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        token_serializer = self.serializer_class(data=request.data)

        if token_serializer.is_valid():
            user = token_serializer.user

            return Response({
                "username": user.username,
                "token": token_serializer.validated_data,
            }, status=status.HTTP_200_OK)

        return Response(token_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
