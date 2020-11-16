from django.db import models

class Department(models.Model):
    department_id = models.AutoField(primary_key = True)
    department_name = models.CharField(max_length=100)

class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.CharField(max_length=100)
    employee_department = models.CharField(max_length=100)
    registration_date = models.DateField()
    employee_photo = models.CharField(max_length=100)