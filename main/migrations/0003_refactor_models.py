from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_merge_patrolcouncil_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patrolmember',
            name='role',
            field=models.CharField(choices=[('PL', 'Patrol Leader'), ('APL', 'Assistant Patrol Leader'), ('Secretary', 'Secretary'), ('Treasurer', 'Treasurer'), ('Member', 'Member'), ('Other', 'Other')], default='Member', max_length=20, help_text='Role within the patrol'),
        ),
        migrations.CreateModel(
            name='CrewLeader',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('position', models.CharField(max_length=200)),
                ('bio', models.TextField(blank=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='crew_leaders/')),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=50, null=True)),
                ('facebook_url', models.URLField(blank=True, null=True)),
                ('instagram_url', models.URLField(blank=True, null=True)),
                ('tiktok_url', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={'ordering': ['name']},
        ),
        migrations.DeleteModel(
            name='PatrolCouncil',
        ),
    ]
