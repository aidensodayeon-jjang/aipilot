import pandas as pd
from django.core.management.base import BaseCommand

from api.models import History, StudentMaster


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = './api/management/commands/csv/history.csv'

        columns = ['userid', 'reg_date', 'memo']
        df = pd.read_csv(file_path, names=columns, header=0)
        df = df.fillna('')

        objs = []
        for _, row in df.iterrows():
            userid = StudentMaster.objects.filter(id=row.to_dict()['userid']).first()
            if userid:
                row_to_dict = row.to_dict()
                del row_to_dict['userid']
                obj = History(userid=userid, **row_to_dict)
                objs.append(obj)

        History.objects.bulk_create(objs)
