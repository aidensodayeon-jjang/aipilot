import pandas as pd
from django.core.management.base import BaseCommand

from api.models import StudentMaster


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = './api/management/commands/csv/usermaster2.csv'

        columns = ['id', 'regdate', 'phone_user', 'phone_parent', 'name_parent', 'name', 'gender', 'birth', 'school',
                   'grade', 'input_path', 'status', 'counsel', 'memo', 'opt_out']
        df = pd.read_csv(file_path, names=columns, header=0)
        df = df.fillna('')

        objs = (StudentMaster(**row.to_dict()) for _, row in df.iterrows())
        StudentMaster.objects.bulk_create(objs)
