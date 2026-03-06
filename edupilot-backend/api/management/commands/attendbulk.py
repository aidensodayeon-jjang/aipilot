import pandas as pd
from django.core.management.base import BaseCommand

from api.models import Attend, StudentMaster


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = './api/management/commands/csv/attend.csv'

        columns = ['userid', 'term', 'subject', 'round', 'status', 'res_date', 'memo']
        df = pd.read_csv(file_path, names=columns, header=0)
        df = df.fillna('')

        objs = []
        for _, row in df.iterrows():
            userid = StudentMaster.objects.filter(id=row.to_dict()['userid']).first()
            if userid:
                row_to_dict = row.to_dict()
                del row_to_dict['userid']
                obj = Attend(userid=userid, **row_to_dict)
                objs.append(obj)

        Attend.objects.bulk_create(objs)
