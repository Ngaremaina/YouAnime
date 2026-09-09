"""Initial schema (animations, directors, customers, genres)

The two prior migrations were empty no-ops, so no schema has actually been
created via Alembic yet. This migration creates the full schema on Postgres.

Revision ID: c333cc7bb7dc
Revises: de2172f97b35
Create Date: 2026-09-09
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c333cc7bb7dc'
down_revision = 'de2172f97b35'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'directors',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('phone_number', sa.String(), nullable=False),
        sa.Column('gender', sa.String(), nullable=False),
        sa.Column('age', sa.Integer(), nullable=False),
        sa.Column('password', sa.String(), nullable=False),
    )

    op.create_table(
        'genres',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(), nullable=False),
    )

    op.create_table(
        'customers',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('phone_number', sa.String(), nullable=False),
        sa.Column('gender', sa.String(), nullable=False),
        sa.Column('age', sa.Integer(), nullable=False),
        sa.Column('password', sa.String(), nullable=False),
    )

    op.create_table(
        'animations',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('plot', sa.String(), nullable=False),
        sa.Column('year', sa.String(), nullable=False),
        sa.Column('cover', sa.String(), nullable=False),
        sa.Column('type', sa.String(), nullable=False),
        sa.Column('video_link', sa.String(), nullable=False),
        sa.Column('directors_id', sa.Integer(), sa.ForeignKey('directors.id'), nullable=True),
        sa.Column('genres_id', sa.Integer(), sa.ForeignKey('genres.id'), nullable=True),
    )


def downgrade():
    op.drop_table('animations')
    op.drop_table('customers')
    op.drop_table('genres')
    op.drop_table('directors')
