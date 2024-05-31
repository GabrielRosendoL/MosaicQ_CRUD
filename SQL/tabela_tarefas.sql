-- Table: public.tarefas

-- DROP TABLE IF EXISTS public.tarefas;

CREATE TABLE IF NOT EXISTS public.tarefas
(
    id integer NOT NULL DEFAULT nextval('tarefas_id_seq'::regclass),
    titulo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descricao text COLLATE pg_catalog."default",
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    data_de_criacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer,
    CONSTRAINT tarefas_pkey PRIMARY KEY (id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id)
        REFERENCES public.usuarios (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tarefas
    OWNER to postgres;