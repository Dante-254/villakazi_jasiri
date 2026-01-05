from django.db import migrations


def forwards_func(apps, schema_editor):
    PatrolCouncil = apps.get_model('main', 'PatrolCouncil')
    PatrolMember = apps.get_model('main', 'PatrolMember')

    for council in PatrolCouncil.objects.all():
        # Determine role mapping
        pos = (council.position or '').lower()
        if 'patrol leader' in pos:
            role = 'PL'
        elif 'assistant' in pos:
            role = 'APL'
        elif 'secret' in pos:
            role = 'Secretary'
        elif 'treas' in pos:
            role = 'Treasurer'
        elif 'member' in pos:
            role = 'Member'
        else:
            role = 'Other'

        # Create or update a PatrolMember for this council member
        PatrolMember.objects.create(
            patrol=council.patrol,
            name=council.name,
            role=role,
            bio=council.bio or '',
            image=council.image if hasattr(council, 'image') else None,
        )


def reverse_func(apps, schema_editor):
    # No reverse migration (data copy only)
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
    ]
