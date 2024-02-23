-- Table: public.boards

-- DROP TABLE IF EXISTS public.boards;

CREATE TABLE IF NOT EXISTS public.boards
(
    id integer NOT NULL DEFAULT nextval('boards_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" integer NOT NULL DEFAULT 1,
    date date,
    CONSTRAINT boards_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.boards
    OWNER to postgres;