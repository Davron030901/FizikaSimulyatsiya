from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('simulation/<int:pk>/', views.SimulationDetailView.as_view(), name='simulation_detail'),
    path('simulation/<int:pk>/run/', views.run_simulation, name='run_simulation'),
]
