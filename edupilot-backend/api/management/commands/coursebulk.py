import pandas as pd
from django.core.management.base import BaseCommand

from api.models import CourseMaster, StudentMaster


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = './api/management/commands/csv/course_master.csv'

        columns = ['term', 'course', 'userid', 'phone_parent', 'subject', 'time', 'openlab', 'pay', 'memo']
        df = pd.read_csv(file_path, names=columns, header=0)
        df = df.fillna('')

        objs = []
        for _, row in df.iterrows():
            userid = StudentMaster.objects.filter(id=row.to_dict()['userid']).first()
            if userid:
                row_to_dict = row.to_dict()
                del row_to_dict['userid']
                obj = CourseMaster(userid=userid, **row_to_dict)
                objs.append(obj)

        CourseMaster.objects.bulk_create(objs)
