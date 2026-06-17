create extension if not exists vector;

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text,
  category text not null,
  resource_type text,
  population text,
  geography text,
  state text,
  insurance_type text,
  summary text not null,
  url text,
  phone text,
  tags text[],
  source_priority int default 3,
  last_verified_date date,
  created_at timestamp with time zone default now()
);

create table if not exists resource_chunks (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid references resources(id) on delete cascade,
  chunk_text text not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamp with time zone default now()
);

create or replace function match_resource_chunks (
  query_embedding vector(1536),
  match_count int default 8
)
returns table (
  id uuid,
  resource_id uuid,
  chunk_text text,
  similarity float
)
language sql stable
as $$
  select
    resource_chunks.id,
    resource_chunks.resource_id,
    resource_chunks.chunk_text,
    1 - (resource_chunks.embedding <=> query_embedding) as similarity
  from resource_chunks
  order by resource_chunks.embedding <=> query_embedding
  limit match_count;
$$;

create table if not exists chat_feedback (
  id uuid primary key default gen_random_uuid(),
  question_category text,
  was_helpful boolean,
  feedback_text text,
  created_at timestamp with time zone default now()
);
