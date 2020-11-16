from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from .models import Employee, Department
from .serializer import DepartmentSerializer, EmployeeSerializer
from django.core.files.storage import default_storage

@csrf_exempt
def departmentAPI(request, id=0):
    if request.method == 'GET':
        departments = Department.objects.all()
        departments_serializer = DepartmentSerializer(departments, many=True) #Converts objects to JSON format  
        return JsonResponse(departments_serializer.data, safe=False)
    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        departments_serializer = DepartmentSerializer(data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Added successfully', safe=False)
        return JsonResponse('Something went wrong :(', safe =False)
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Department.objects.get(department_id = department_data['department_id'])
        departments_serializer = DepartmentSerializer(department, data = department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Department updated successfully.', safe=False)
        return JsonResponse('Something went wrong :(', safe = False)
    elif request.method == 'DELETE':
        department = Department.objects.get(department_id = id)
        department.delete()
        return JsonResponse('Department deleted successfully', safe = False)

@csrf_exempt
def employeeAPI(request, id = 0):
    if request.method == 'GET':
        employees = Employee.objects.all()
        employees_serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe = False)
    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employees_serializer = EmployeeSerializer(data = employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Employee successfully added.', safe=False)
        return JsonResponse('Something went wrong :(', safe=False)  
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee = Employee.objects.get(employee_id = employee_data['employee_id'])
        employees_serializer = EmployeeSerializer(employee, data = employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Employee successfully updated.', safe=False)
        return JsonResponse('Something went wrong :(', safe=False)  
    elif request.method == 'DELETE': 
        employee = Employee.objects.get(employee_id = id)
        employee.delete()
        return JsonResponse('Employee deleted successfully', safe = False)

@csrf_exempt
def saveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe = False)
