--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (165f042)
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: company_info; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.company_info (
    id integer NOT NULL,
    heading text NOT NULL,
    tagline text NOT NULL,
    mission_statement text NOT NULL,
    vision_statement text,
    overview text NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_by character varying
);


ALTER TABLE public.company_info OWNER TO neondb_owner;

--
-- Name: company_info_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.company_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_info_id_seq OWNER TO neondb_owner;

--
-- Name: company_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.company_info_id_seq OWNED BY public.company_info.id;


--
-- Name: company_values; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.company_values (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    display_order integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.company_values OWNER TO neondb_owner;

--
-- Name: company_values_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.company_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_values_id_seq OWNER TO neondb_owner;

--
-- Name: company_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.company_values_id_seq OWNED BY public.company_values.id;


--
-- Name: dealers; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.dealers (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    hours text NOT NULL,
    state text NOT NULL,
    district text NOT NULL,
    city text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    display_on_website boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying
);


ALTER TABLE public.dealers OWNER TO neondb_owner;

--
-- Name: dealers_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.dealers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dealers_id_seq OWNER TO neondb_owner;

--
-- Name: dealers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.dealers_id_seq OWNED BY public.dealers.id;


--
-- Name: dynamic_pages; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.dynamic_pages (
    id integer NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    layout text DEFAULT 'one_column'::text NOT NULL,
    placement text DEFAULT 'none'::text NOT NULL,
    meta_title text,
    meta_description text,
    keywords text,
    status text DEFAULT 'draft'::text NOT NULL,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying,
    updated_by character varying
);


ALTER TABLE public.dynamic_pages OWNER TO neondb_owner;

--
-- Name: dynamic_pages_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.dynamic_pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dynamic_pages_id_seq OWNER TO neondb_owner;

--
-- Name: dynamic_pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.dynamic_pages_id_seq OWNED BY public.dynamic_pages.id;


--
-- Name: environmental_impacts; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.environmental_impacts (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    display_order integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.environmental_impacts OWNER TO neondb_owner;

--
-- Name: environmental_impacts_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.environmental_impacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.environmental_impacts_id_seq OWNER TO neondb_owner;

--
-- Name: environmental_impacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.environmental_impacts_id_seq OWNED BY public.environmental_impacts.id;


--
-- Name: faq_categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.faq_categories (
    id integer NOT NULL,
    name text NOT NULL,
    display_order integer DEFAULT 0
);


ALTER TABLE public.faq_categories OWNER TO neondb_owner;

--
-- Name: faq_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.faq_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faq_categories_id_seq OWNER TO neondb_owner;

--
-- Name: faq_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.faq_categories_id_seq OWNED BY public.faq_categories.id;


--
-- Name: faq_questions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.faq_questions (
    id integer NOT NULL,
    category_id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    display_order integer DEFAULT 0,
    status text DEFAULT 'published'::text NOT NULL,
    tags text[],
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.faq_questions OWNER TO neondb_owner;

--
-- Name: faq_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.faq_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faq_questions_id_seq OWNER TO neondb_owner;

--
-- Name: faq_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.faq_questions_id_seq OWNED BY public.faq_questions.id;


--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.form_submissions (
    id integer NOT NULL,
    form_type text NOT NULL,
    data jsonb NOT NULL,
    status text DEFAULT 'unread'::text NOT NULL,
    submitted_at timestamp without time zone DEFAULT now() NOT NULL,
    responded_at timestamp without time zone,
    responded_by character varying,
    notes text
);


ALTER TABLE public.form_submissions OWNER TO neondb_owner;

--
-- Name: form_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.form_submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.form_submissions_id_seq OWNER TO neondb_owner;

--
-- Name: form_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.form_submissions_id_seq OWNED BY public.form_submissions.id;


--
-- Name: hero_slides; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.hero_slides (
    id integer NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    subtitle text NOT NULL,
    image text,
    video_url text,
    cta_text text,
    cta_link text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true NOT NULL,
    auto_rotate_timing integer DEFAULT 5000,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hero_slides OWNER TO neondb_owner;

--
-- Name: hero_slides_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.hero_slides_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hero_slides_id_seq OWNER TO neondb_owner;

--
-- Name: hero_slides_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.hero_slides_id_seq OWNED BY public.hero_slides.id;


--
-- Name: job_openings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.job_openings (
    id integer NOT NULL,
    title text NOT NULL,
    department text NOT NULL,
    location text NOT NULL,
    type text NOT NULL,
    experience text NOT NULL,
    description text NOT NULL,
    qualifications text,
    responsibilities text,
    status text DEFAULT 'active'::text NOT NULL,
    posted_date timestamp without time zone DEFAULT now() NOT NULL,
    application_deadline timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying
);


ALTER TABLE public.job_openings OWNER TO neondb_owner;

--
-- Name: job_openings_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.job_openings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_openings_id_seq OWNER TO neondb_owner;

--
-- Name: job_openings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.job_openings_id_seq OWNED BY public.job_openings.id;


--
-- Name: joint_ventures; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.joint_ventures (
    id integer NOT NULL,
    name text NOT NULL,
    logo text,
    description text NOT NULL,
    status text DEFAULT 'active'::text NOT NULL,
    display_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.joint_ventures OWNER TO neondb_owner;

--
-- Name: joint_ventures_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.joint_ventures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.joint_ventures_id_seq OWNER TO neondb_owner;

--
-- Name: joint_ventures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.joint_ventures_id_seq OWNED BY public.joint_ventures.id;


--
-- Name: media_library; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.media_library (
    id integer NOT NULL,
    filename text NOT NULL,
    original_filename text NOT NULL,
    file_path text NOT NULL,
    file_type text NOT NULL,
    mime_type text NOT NULL,
    file_size integer NOT NULL,
    width integer,
    height integer,
    alt_text text,
    caption text,
    folder text DEFAULT 'uncategorized'::text,
    uploaded_at timestamp without time zone DEFAULT now() NOT NULL,
    uploaded_by character varying
);


ALTER TABLE public.media_library OWNER TO neondb_owner;

--
-- Name: media_library_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.media_library_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_library_id_seq OWNER TO neondb_owner;

--
-- Name: media_library_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.media_library_id_seq OWNED BY public.media_library.id;


--
-- Name: press_articles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.press_articles (
    id integer NOT NULL,
    title text NOT NULL,
    publication text NOT NULL,
    publication_date text NOT NULL,
    excerpt text NOT NULL,
    image text,
    category text NOT NULL,
    full_content text,
    external_link text,
    status text DEFAULT 'published'::text NOT NULL,
    display_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying
);


ALTER TABLE public.press_articles OWNER TO neondb_owner;

--
-- Name: press_articles_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.press_articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.press_articles_id_seq OWNER TO neondb_owner;

--
-- Name: press_articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.press_articles_id_seq OWNED BY public.press_articles.id;


--
-- Name: seo_metadata; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.seo_metadata (
    id integer NOT NULL,
    page_path text NOT NULL,
    page_title text NOT NULL,
    meta_description text NOT NULL,
    meta_keywords text,
    og_title text,
    og_description text,
    og_image text,
    twitter_card text,
    canonical_url text,
    robots_meta text DEFAULT 'index,follow'::text,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_by character varying
);


ALTER TABLE public.seo_metadata OWNER TO neondb_owner;

--
-- Name: seo_metadata_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.seo_metadata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.seo_metadata_id_seq OWNER TO neondb_owner;

--
-- Name: seo_metadata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.seo_metadata_id_seq OWNED BY public.seo_metadata.id;


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.site_settings (
    id integer NOT NULL,
    key text NOT NULL,
    value text,
    category text NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_by character varying
);


ALTER TABLE public.site_settings OWNER TO neondb_owner;

--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.site_settings_id_seq OWNER TO neondb_owner;

--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: smart_features; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.smart_features (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    display_order integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.smart_features OWNER TO neondb_owner;

--
-- Name: smart_features_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.smart_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.smart_features_id_seq OWNER TO neondb_owner;

--
-- Name: smart_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.smart_features_id_seq OWNED BY public.smart_features.id;


--
-- Name: stats; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.stats (
    id integer NOT NULL,
    value text NOT NULL,
    label text NOT NULL,
    icon text NOT NULL,
    display_order integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.stats OWNER TO neondb_owner;

--
-- Name: stats_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stats_id_seq OWNER TO neondb_owner;

--
-- Name: stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.stats_id_seq OWNED BY public.stats.id;


--
-- Name: strategic_partners; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.strategic_partners (
    id integer NOT NULL,
    name text NOT NULL,
    logo text,
    description text,
    display_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.strategic_partners OWNER TO neondb_owner;

--
-- Name: strategic_partners_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.strategic_partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strategic_partners_id_seq OWNER TO neondb_owner;

--
-- Name: strategic_partners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.strategic_partners_id_seq OWNED BY public.strategic_partners.id;


--
-- Name: team_members; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.team_members (
    id integer NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    tier text NOT NULL,
    department text,
    image text,
    bio text NOT NULL,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.team_members OWNER TO neondb_owner;

--
-- Name: team_members_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.team_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.team_members_id_seq OWNER TO neondb_owner;

--
-- Name: team_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.team_members_id_seq OWNED BY public.team_members.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    quote text NOT NULL,
    customer_name text NOT NULL,
    location text NOT NULL,
    image text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.testimonials OWNER TO neondb_owner;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO neondb_owner;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    full_name text,
    role text DEFAULT 'content_manager'::text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: vehicle_colors; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vehicle_colors (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    name text NOT NULL,
    image text,
    display_order integer DEFAULT 0
);


ALTER TABLE public.vehicle_colors OWNER TO neondb_owner;

--
-- Name: vehicle_colors_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vehicle_colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicle_colors_id_seq OWNER TO neondb_owner;

--
-- Name: vehicle_colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vehicle_colors_id_seq OWNED BY public.vehicle_colors.id;


--
-- Name: vehicle_smart_features; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vehicle_smart_features (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text,
    display_order integer DEFAULT 0
);


ALTER TABLE public.vehicle_smart_features OWNER TO neondb_owner;

--
-- Name: vehicle_smart_features_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vehicle_smart_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicle_smart_features_id_seq OWNER TO neondb_owner;

--
-- Name: vehicle_smart_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vehicle_smart_features_id_seq OWNED BY public.vehicle_smart_features.id;


--
-- Name: vehicle_specifications; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vehicle_specifications (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    label text NOT NULL,
    value text NOT NULL,
    display_order integer DEFAULT 0
);


ALTER TABLE public.vehicle_specifications OWNER TO neondb_owner;

--
-- Name: vehicle_specifications_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vehicle_specifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicle_specifications_id_seq OWNER TO neondb_owner;

--
-- Name: vehicle_specifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vehicle_specifications_id_seq OWNED BY public.vehicle_specifications.id;


--
-- Name: vehicles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vehicles (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    tagline text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    main_image text,
    front_image text,
    status text DEFAULT 'active'::text NOT NULL,
    display_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying,
    updated_by character varying,
    key_highlights text[]
);


ALTER TABLE public.vehicles OWNER TO neondb_owner;

--
-- Name: vehicles_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.vehicles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicles_id_seq OWNER TO neondb_owner;

--
-- Name: vehicles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.vehicles_id_seq OWNED BY public.vehicles.id;


--
-- Name: company_info id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.company_info ALTER COLUMN id SET DEFAULT nextval('public.company_info_id_seq'::regclass);


--
-- Name: company_values id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.company_values ALTER COLUMN id SET DEFAULT nextval('public.company_values_id_seq'::regclass);


--
-- Name: dealers id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dealers ALTER COLUMN id SET DEFAULT nextval('public.dealers_id_seq'::regclass);


--
-- Name: dynamic_pages id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dynamic_pages ALTER COLUMN id SET DEFAULT nextval('public.dynamic_pages_id_seq'::regclass);


--
-- Name: environmental_impacts id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.environmental_impacts ALTER COLUMN id SET DEFAULT nextval('public.environmental_impacts_id_seq'::regclass);


--
-- Name: faq_categories id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faq_categories ALTER COLUMN id SET DEFAULT nextval('public.faq_categories_id_seq'::regclass);


--
-- Name: faq_questions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faq_questions ALTER COLUMN id SET DEFAULT nextval('public.faq_questions_id_seq'::regclass);


--
-- Name: form_submissions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.form_submissions ALTER COLUMN id SET DEFAULT nextval('public.form_submissions_id_seq'::regclass);


--
-- Name: hero_slides id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.hero_slides ALTER COLUMN id SET DEFAULT nextval('public.hero_slides_id_seq'::regclass);


--
-- Name: job_openings id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_openings ALTER COLUMN id SET DEFAULT nextval('public.job_openings_id_seq'::regclass);


--
-- Name: joint_ventures id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.joint_ventures ALTER COLUMN id SET DEFAULT nextval('public.joint_ventures_id_seq'::regclass);


--
-- Name: media_library id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.media_library ALTER COLUMN id SET DEFAULT nextval('public.media_library_id_seq'::regclass);


--
-- Name: press_articles id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.press_articles ALTER COLUMN id SET DEFAULT nextval('public.press_articles_id_seq'::regclass);


--
-- Name: seo_metadata id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.seo_metadata ALTER COLUMN id SET DEFAULT nextval('public.seo_metadata_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Name: smart_features id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.smart_features ALTER COLUMN id SET DEFAULT nextval('public.smart_features_id_seq'::regclass);


--
-- Name: stats id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.stats ALTER COLUMN id SET DEFAULT nextval('public.stats_id_seq'::regclass);


--
-- Name: strategic_partners id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.strategic_partners ALTER COLUMN id SET DEFAULT nextval('public.strategic_partners_id_seq'::regclass);


--
-- Name: team_members id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.team_members ALTER COLUMN id SET DEFAULT nextval('public.team_members_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: vehicle_colors id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_colors ALTER COLUMN id SET DEFAULT nextval('public.vehicle_colors_id_seq'::regclass);


--
-- Name: vehicle_smart_features id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_smart_features ALTER COLUMN id SET DEFAULT nextval('public.vehicle_smart_features_id_seq'::regclass);


--
-- Name: vehicle_specifications id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_specifications ALTER COLUMN id SET DEFAULT nextval('public.vehicle_specifications_id_seq'::regclass);


--
-- Name: vehicles id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicles ALTER COLUMN id SET DEFAULT nextval('public.vehicles_id_seq'::regclass);


--
-- Data for Name: company_info; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.company_info (id, heading, tagline, mission_statement, vision_statement, overview, updated_at, updated_by) FROM stdin;
1	About VARCAS	Pioneering electric vehicle manufacturer dedicated to accelerating the global transition to sustainable transportation	Varcas is committed to innovation, affordability, and reliability. We strive to provide complete e-mobility solutions while upholding values of integrity, excellence, and sustainability.	\N	Team Varcas comprises professionals from USA & INDIA who have extensive professional experience of 20+ years in IT and Automobile. We have a proven track record of delivering high-quality services through our experienced professionals with an understanding of global business and regulatory requirements.	2025-10-21 07:08:08.5946	\N
\.


--
-- Data for Name: company_values; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.company_values (id, title, description, icon, display_order, updated_at) FROM stdin;
1	Reliability	20+ years of proven excellence in delivering high-quality e-mobility solutions	Award	0	2025-10-21 07:08:08.678333
2	Sustainability	Committed to accelerating the global transition to eco-friendly transportation	Globe	1	2025-10-21 07:08:08.678333
3	Affordability	Making electric vehicles accessible to everyone with economical pricing	Target	2	2025-10-21 07:08:08.678333
4	Excellence	Professional team from USA & India with deep automotive expertise	Users	3	2025-10-21 07:08:08.678333
\.


--
-- Data for Name: dealers; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.dealers (id, name, address, phone, email, hours, state, district, city, status, display_on_website, created_at, updated_at, created_by) FROM stdin;
1	VARCAS Connaught Place	Block A, Connaught Place, New Delhi, Delhi - 110001	+91 11 4567 8900	delhi@varcasautomobiles.com	Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM	Delhi	Central Delhi	New Delhi	active	t	2025-10-21 07:08:09.391946	2025-10-21 07:08:09.391946	\N
2	VARCAS Dwarka	Sector 12, Dwarka, New Delhi, Delhi - 110075	+91 11 4567 8901	dwarka@varcasautomobiles.com	Mon-Sat: 10:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM	Delhi	South West Delhi	Dwarka	active	t	2025-10-21 07:08:09.391946	2025-10-21 07:08:09.391946	\N
3	VARCAS Andheri	SV Road, Andheri West, Mumbai, Maharashtra - 400053	+91 22 4567 8900	andheri@varcasautomobiles.com	Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed	Maharashtra	Mumbai Suburban	Mumbai	active	t	2025-10-21 07:08:09.391946	2025-10-21 07:08:09.391946	\N
\.


--
-- Data for Name: dynamic_pages; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.dynamic_pages (id, slug, title, content, layout, placement, meta_title, meta_description, keywords, status, display_order, is_active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	privacy-a7rp	Privacy Policy A7Rp	This is our privacy policy.\n\nWe protect your data.\n\nContact us for more information.	two_column	footer	Privacy Policy - VARCAS	Read our privacy policy	privacy, policy, data protection	published	0	t	2025-10-22 05:01:53.436158	2025-10-22 05:05:03.568	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	f2bec605-1ee5-4f4c-99d2-e95e77da68a5
2	terms-aveb	Terms aveb	Welcome to our terms.\n\nPlease read carefully.	two_column	header	Terms - VARCAS	Our terms and conditions	terms, conditions	published	0	t	2025-10-22 05:09:13.138198	2025-10-22 05:10:56.118	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	f2bec605-1ee5-4f4c-99d2-e95e77da68a5
\.


--
-- Data for Name: environmental_impacts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.environmental_impacts (id, title, description, icon, display_order, updated_at) FROM stdin;
1	Zero Emissions	Powered by lithium-ion batteries, emitting zero pollutants and saving up to 500 pounds of carbon emissions annually	Leaf	0	2025-10-21 07:08:08.433045
2	Energy Efficiency	Exceptionally energy-efficient with minimal electricity consumption thanks to advanced battery technology	Zap	1	2025-10-21 07:08:08.433045
3	Reduced Traffic Congestion	Efficient and convenient mode of transportation, helping streamline city commutes	Car	2	2025-10-21 07:08:08.433045
4	Reduced Noise Pollution	Quieter operation compared to gas-powered vehicles for a peaceful riding experience	Volume2	3	2025-10-21 07:08:08.433045
5	Sustainable Transportation	Promoting active transportation and healthier lifestyle choices for a greener future	Trees	4	2025-10-21 07:08:08.433045
6	Long-Lasting Batteries	Durable battery technology with recyclable components at end of lifespan	Battery	5	2025-10-21 07:08:08.433045
\.


--
-- Data for Name: faq_categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.faq_categories (id, name, display_order) FROM stdin;
1	Charging & Battery	0
2	Range & Performance	1
3	Cost & Savings	2
4	Legal & Registration	3
5	Service & Support	4
\.


--
-- Data for Name: faq_questions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.faq_questions (id, category_id, question, answer, display_order, status, tags, created_at, updated_at) FROM stdin;
1	1	How long does it take to charge the scooter?	Around 2–3 hours for Lithium Ion batteries and 6–7 hours in case of Graphene / Lead-acid batteries.	0	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
2	1	Can I charge it at home?	Yes, the scooter comes with a portable charger compatible with regular household outlets – using a standard 5A socket.	1	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
3	1	What is the battery warranty?	3 years or 20,000 km (whichever comes first) for Lithium Ion; typically 9 months for Graphene batteries.	2	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
4	1	Is fast charging available?	Not currently, but future models may support it.	3	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
5	2	What is the real-world range?	Depends on battery capacity. For example, a 60V 31Ah Lithium Ion battery typically gives 60–70 km per charge (depending on terrain, rider weight, and driving conditions).	0	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
6	2	What is the top speed?	We have both low-speed and high-speed models ideal for urban and semi-rural commuting.	1	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
7	2	Can I ride in the rain?	Yes, the scooter is IP-rated for water resistance.	2	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
8	3	How much does it cost to charge?	About 1.5 units of electricity – roughly less than ₹10 per full charge (based on ₹6/kWh rate).	0	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
9	3	What are the maintenance costs?	Very low—no oil changes, fewer moving parts, and only minimal servicing every 3 months (required to maintain warranty).	1	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
10	3	Are there government subsidies?	No, we don't take government subsidies. At Varcas, we believe in ethical, transparent business practices. Even without subsidies, our scooters are priced competitively.	2	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
11	4	Do I need a license or registration?	Not required for low-speed vehicles. Required for high-speed models.	0	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
12	4	Is insurance mandatory?	Optional for license-free models; mandatory for registered ones.	1	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
13	5	Where can I get it serviced?	At any authorized Varcas service center or via doorstep service in select areas.	0	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
14	5	What does the warranty cover?	Battery, motor, and controller. Physical damage and water ingress are excluded.	1	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
15	5	Are spare parts available?	Yes, through Varcas dealers, company stores, website, and service partners.	2	published	\N	2025-10-21 07:08:09.309507	2025-10-21 07:08:09.309507
\.


--
-- Data for Name: form_submissions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.form_submissions (id, form_type, data, status, submitted_at, responded_at, responded_by, notes) FROM stdin;
\.


--
-- Data for Name: hero_slides; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.hero_slides (id, type, title, subtitle, image, video_url, cta_text, cta_link, display_order, is_active, auto_rotate_timing, created_at, updated_at) FROM stdin;
1	image	Smart & Connected	Experience the future of urban commuting with Varcas' Smart & Connected E-Bike	/assets/Gemini_Generated_Image_4jzcos4jzcos4jzc_1759490673763.png	\N	\N	\N	0	t	5000	2025-10-21 07:08:08.16736	2025-10-21 07:08:08.16736
2	image	Reliable, Sustainable & Affordable	Complete e-mobility solutions for a greener tomorrow	/assets/Gemini_Generated_Image_qk9odzqk9odzqk9o_1759490673764.png	\N	\N	\N	1	t	5000	2025-10-21 07:08:08.16736	2025-10-21 07:08:08.16736
3	image	150 KM Range	Economical ride at just 13 Paise/KM with lithium-ion battery technology	/assets/Gemini_Generated_Image_w9nnm2w9nnm2w9nn_1759490673764.png	\N	\N	\N	2	t	5000	2025-10-21 07:08:08.16736	2025-10-21 07:08:08.16736
4	video	Watch Our Engineering	See how we assemble the future of electric mobility	\N	\N	\N	\N	3	t	5000	2025-10-21 07:08:08.16736	2025-10-21 07:08:08.16736
\.


--
-- Data for Name: job_openings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.job_openings (id, title, department, location, type, experience, description, qualifications, responsibilities, status, posted_date, application_deadline, created_at, updated_at, created_by) FROM stdin;
1	Senior Electrical Engineer	Engineering	Bangalore, India	Full-time	5-8 years	Lead the design and development of electric vehicle powertrains and battery management systems. Work with cutting-edge EV technology.	\N	\N	active	2025-10-21 07:08:08.89519	\N	2025-10-21 07:08:08.89519	2025-10-21 07:08:08.89519	\N
2	Product Manager - EV	Product	Mumbai, India	Full-time	3-5 years	Drive product strategy and roadmap for our electric scooter lineup. Work closely with engineering and design teams.	\N	\N	active	2025-10-21 07:08:08.89519	\N	2025-10-21 07:08:08.89519	2025-10-21 07:08:08.89519	\N
3	Sales Manager	Sales	Delhi NCR, India	Full-time	4-6 years	Lead sales strategy and team to expand VARCAS presence across North India. Build dealer network and partnerships.	\N	\N	active	2025-10-21 07:08:08.89519	\N	2025-10-21 07:08:08.89519	2025-10-21 07:08:08.89519	\N
4	UI/UX Designer	Design	Remote	Full-time	2-4 years	Design intuitive digital experiences for our mobile app and web platforms. Create design systems for connected EV features.	\N	\N	active	2025-10-21 07:08:08.89519	\N	2025-10-21 07:08:08.89519	2025-10-21 07:08:08.89519	\N
5	Manufacturing Engineer	Manufacturing	Chennai, India	Full-time	3-5 years	Optimize production processes and implement quality control systems. Work on assembly line efficiency for electric vehicles.	\N	\N	active	2025-10-21 07:08:08.89519	\N	2025-10-21 07:08:08.89519	2025-10-21 07:08:08.89519	\N
6	Marketing Specialist	Marketing	Pune, India	Full-time	2-4 years	Develop and execute marketing campaigns for EV products. Manage digital marketing, social media, and brand communications.	\N	\N	active	2025-10-21 07:08:08.89519	\N	2025-10-21 07:08:08.89519	2025-10-21 07:08:08.89519	\N
\.


--
-- Data for Name: joint_ventures; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.joint_ventures (id, name, logo, description, status, display_order, created_at, updated_at) FROM stdin;
1	Prevalance	https://varcasautomobiles.com/images/prevalancelogo.png	Strategic partnership with Prevalance to develop next-generation electric mobility solutions for emerging markets, combining expertise in automotive technology and market expansion.	active	0	2025-10-21 07:08:09.461936	2025-10-21 07:08:09.461936
\.


--
-- Data for Name: media_library; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.media_library (id, filename, original_filename, file_path, file_type, mime_type, file_size, width, height, alt_text, caption, folder, uploaded_at, uploaded_by) FROM stdin;
\.


--
-- Data for Name: press_articles; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.press_articles (id, title, publication, publication_date, excerpt, image, category, full_content, external_link, status, display_order, created_at, updated_at, created_by) FROM stdin;
1	VARCAS Launches New Electric Scooter Range in India	Economic Times	March 15, 2024	VARCAS Automobiles has announced the launch of its latest electric scooter range, featuring advanced battery technology and smart connectivity features. The new models promise a range of up to 150 km on a single charge.	https://varcasautomobiles.com/images/press/launch.jpg	Product Launch	\N	\N	published	0	2025-10-21 07:08:08.818874	2025-10-21 07:08:08.818874	\N
2	Electric Vehicle Revolution: VARCAS Partners with Major Dealers	The Hindu Business Line	February 28, 2024	In a strategic move to expand its market presence, VARCAS has partnered with leading dealerships across India to make electric vehicles more accessible to consumers in tier-2 and tier-3 cities.	https://varcasautomobiles.com/images/press/partnership.jpg	Business	\N	\N	published	1	2025-10-21 07:08:08.818874	2025-10-21 07:08:08.818874	\N
3	VARCAS Wins 'Best EV Innovation' Award at Auto Expo 2024	Auto Today	January 20, 2024	VARCAS Automobiles has been honored with the 'Best EV Innovation' award at Auto Expo 2024 for its groundbreaking battery management system and sustainable manufacturing practices.	https://varcasautomobiles.com/images/press/award.jpg	Awards	\N	\N	published	2	2025-10-21 07:08:08.818874	2025-10-21 07:08:08.818874	\N
4	Going Green: VARCAS Achieves Carbon Neutral Manufacturing	Business Standard	December 10, 2023	VARCAS has successfully achieved carbon-neutral status in its manufacturing facilities, setting a new benchmark for sustainable electric vehicle production in India.	https://varcasautomobiles.com/images/press/sustainability.jpg	Sustainability	\N	\N	published	3	2025-10-21 07:08:08.818874	2025-10-21 07:08:08.818874	\N
5	VARCAS and Prevalance Joint Venture Announced	Financial Express	November 5, 2023	VARCAS Automobiles has entered into a strategic joint venture with Prevalance to develop next-generation electric mobility solutions for emerging markets.	https://varcasautomobiles.com/images/press/jv.jpg	Partnership	\N	\N	published	4	2025-10-21 07:08:08.818874	2025-10-21 07:08:08.818874	\N
6	Customer First: VARCAS Expands Service Network to 100+ Cities	LiveMint	October 18, 2023	VARCAS continues its expansion with service centers now operational in over 100 cities across India, ensuring seamless after-sales support for electric vehicle owners.	https://varcasautomobiles.com/images/press/service.jpg	Service	\N	\N	published	5	2025-10-21 07:08:08.818874	2025-10-21 07:08:08.818874	\N
\.


--
-- Data for Name: seo_metadata; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.seo_metadata (id, page_path, page_title, meta_description, meta_keywords, og_title, og_description, og_image, twitter_card, canonical_url, robots_meta, updated_at, updated_by) FROM stdin;
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.site_settings (id, key, value, category, updated_at, updated_by) FROM stdin;
\.


--
-- Data for Name: smart_features; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.smart_features (id, title, description, icon, display_order, updated_at) FROM stdin;
1	Lithium-ION Battery	3 Year Warranty, maintenance free & portable battery technology	Battery	0	2025-10-21 07:08:08.359701
2	GPS, GPRS Tracking	Real-time remote GPS tracking for peace of mind to the user & family	Navigation	1	2025-10-21 07:08:08.359701
3	150 KM Range	Economical ride at just 13 Paise/KM with efficient battery management	Zap	2	2025-10-21 07:08:08.359701
4	Varcas Care Program	Assured door step sales & after sales support at minimal annual cost	Shield	3	2025-10-21 07:08:08.359701
5	Trip Tracking	Alert the owner when scooter moves out of defined geography or speed	MapPin	4	2025-10-21 07:08:08.359701
6	Smart Alerts	Battery voltage, theft, crash, speed alerts and remote immobilization	Bell	5	2025-10-21 07:08:08.359701
\.


--
-- Data for Name: stats; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.stats (id, value, label, icon, display_order, updated_at) FROM stdin;
1	30,000+	Happy Customers	Users	0	2025-10-21 07:08:08.268951
2	250+	Service Centers	MapPin	1	2025-10-21 07:08:08.268951
3	400+	Sale Points	ShoppingBag	2	2025-10-21 07:08:08.268951
4	3,500+	Joy Rides	Award	3	2025-10-21 07:08:08.268951
\.


--
-- Data for Name: strategic_partners; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.strategic_partners (id, name, logo, description, display_order, created_at, updated_at) FROM stdin;
1	Laxmi Motors	https://varcasautomobiles.com/images/laxmimotorslogo.png	Trusted partner in vehicle distribution	0	2025-10-21 07:08:09.534384	2025-10-21 07:08:09.534384
2	Volta	https://varcasautomobiles.com/images/voltalogo.png	Battery technology collaboration	1	2025-10-21 07:08:09.534384	2025-10-21 07:08:09.534384
3	EVPE	https://varcasautomobiles.com/images/evpelogo.png	Electric vehicle parts and engineering	2	2025-10-21 07:08:09.534384	2025-10-21 07:08:09.534384
\.


--
-- Data for Name: team_members; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.team_members (id, name, role, tier, department, image, bio, display_order, is_active, created_at, updated_at) FROM stdin;
1	Ram Vemireddy	Founder & CEO	ceo	\N	/assets/stock_images/professional_busines_82f1c896.jpg	Two decades of experience in Information Security and Compliance management for leading companies in the USA. Transitioning into the automotive industry in 2018, he spearheads Varcas with a commitment to sustainability.	0	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
2	Chenna Reddy	Finance Head	executive	\N	/assets/stock_images/professional_busines_82f1c896.jpg	Oversees all financial operations, ensuring effective planning, control, and reporting. Plays a key role in driving financial strategy, maintaining compliance, and supporting the company's overall growth.	1	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
3	LN Rao	COO	executive	\N	/assets/stock_images/professional_busines_82f1c896.jpg	As Chief Operating Officer, ensures smooth execution of business operations, streamlining processes and driving efficiency across departments to align with the company's strategic goals.	2	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
4	Venkat Reddy	Legal & Compliance Head	executive	\N	/assets/stock_images/professional_busines_82f1c896.jpg	Oversees legal affairs and regulatory compliance, ensuring the company operates within legal frameworks while protecting its interests and maintaining ethical business practices.	3	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
5	Mr. A C Keshava Reddy	Advisory Board Member	advisor	\N	/assets/stock_images/professional_busines_82f1c896.jpg	Mechanical engineer with vast experience across Asia in telecom, power, automobile, and government sectors. Active in the EV space since 2008, collaborated with the Ministry of Environment on pollution-reduction policies.	4	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
6	Mr. Sridhar Ramani	Director/Chief Mentor	advisor	\N	/assets/stock_images/professional_busines_82f1c896.jpg	Board Member and Advisor with extensive experience in technology and business strategy, providing valuable guidance to the leadership team in driving growth and innovation.	5	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
7	K. Chandu	Production Manager	manager	Production	/assets/stock_images/professional_busines_82f1c896.jpg	Leads production at Varcas Automobiles, managing assembly processes, upholding quality standards, and advancing the company's mission for reliable electric vehicles.	6	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
8	S. Madhu	R&D & Sourcing Manager	manager	R&D	/assets/stock_images/professional_busines_82f1c896.jpg	Drives research and development initiatives while managing sourcing operations to ensure quality components and innovative solutions for VARCAS vehicles.	7	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
9	Hari Prakash	Stores, Spare Parts & Customer Support Manager	manager	Customer Support	/assets/stock_images/professional_busines_82f1c896.jpg	Manages stores, spare parts sales, warranty services, and customer support operations, ensuring excellent after-sales service and customer satisfaction.	8	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
10	Syda Rao	Accounts Department	team_member	Accounts	/assets/stock_images/professional_busines_82f1c896.jpg	Manages accounting operations and financial records, supporting the finance team in maintaining accurate financial documentation.	9	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
11	J. Gangadhar	Production Department	team_member	Production	/assets/stock_images/professional_busines_82f1c896.jpg	Key member of the production team, contributing to manufacturing excellence and quality control processes.	10	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
12	Mahesh	Production Department	team_member	Production	/assets/stock_images/professional_busines_82f1c896.jpg	Supports production operations, ensuring smooth manufacturing processes and adherence to quality standards.	11	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
13	B. Naveen	Warranty & Customer Support	team_member	Customer Support	/assets/stock_images/professional_busines_82f1c896.jpg	Provides warranty services and customer support, ensuring customer satisfaction and addressing service needs efficiently.	12	t	2025-10-21 07:08:08.748771	2025-10-21 07:08:08.748771
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.testimonials (id, quote, customer_name, location, image, display_order, is_active, created_at, updated_at) FROM stdin;
1	Varcas e-bikes have revolutionized my daily commute! The sleek design, long-lasting battery, and smooth ride make every journey effortless. I'm proud to be a Varcas e-bike owner!	Karthik Reddy	Bangalore	/assets/stock_images/happy_customer_portr_4a379b91.jpg	0	t	2025-10-21 07:08:08.521222	2025-10-21 07:08:08.521222
2	I was skeptical about e-bikes until I tried Varcas. Their e-bikes offer the perfect combination of pedal power and electric assistance. Best decision for my daily travel.	Priya Sharma	Mumbai	/assets/stock_images/happy_customer_portr_9a0c17fa.jpg	1	t	2025-10-21 07:08:08.521222	2025-10-21 07:08:08.521222
3	The GPS tracking and smart features give me complete peace of mind. Plus, the cost savings compared to my old petrol scooter are incredible. Highly recommended!	Amit Patel	Ahmedabad	/assets/stock_images/happy_customer_portr_d1a74b8f.jpg	2	t	2025-10-21 07:08:08.521222	2025-10-21 07:08:08.521222
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, password, email, full_name, role, is_active, created_at, updated_at) FROM stdin;
f2bec605-1ee5-4f4c-99d2-e95e77da68a5	admin	$2b$10$hcb.tTPnPwbRDyVl0kRUEuSvVJmJPb5cxY3mrVN3Fg4ScNUuQrAJy	superadmin@varcasev.com	Admin User	super_admin	t	2025-10-21 07:08:07.988981	2025-10-21 07:08:07.988981
\.


--
-- Data for Name: vehicle_colors; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.vehicle_colors (id, vehicle_id, name, image, display_order) FROM stdin;
1	1	Pearl White	https://varcasautomobiles.com/images/falconwhite.png	0
2	1	Crimson Red	https://varcasautomobiles.com/images/falconred.jpg	1
3	1	Ocean Blue	https://varcasautomobiles.com/images/Falcon%20Blue.JPG	2
4	2	Graphite Black	https://varcasautomobiles.com/images/cap-img-1.png	0
5	2	Crimson Red	https://varcasautomobiles.com/images/cap-img-3.png	1
6	2	Ocean Blue	https://varcasautomobiles.com/images/cap-img-2.png	2
7	3	Pearl White	https://varcasautomobiles.com/images/cronywhite.png	0
8	3	Ruby Red	https://varcasautomobiles.com/images/cap-img-7.png	1
9	3	Golden Glow	https://varcasautomobiles.com/images/cap-img-6.png	2
10	4	Forest Green	https://varcasautomobiles.com/images/amangreen.png	0
11	4	Crimson Red	https://varcasautomobiles.com/images/amanred.png	1
12	4	Ocean Blue	https://varcasautomobiles.com/images/amanblue.png	2
13	5	Ruby Red	https://varcasautomobiles.com/images/ruby-red.png	0
14	5	Ocean Blue	https://varcasautomobiles.com/images/ruby-blue.png	1
15	5	Golden Glow	https://varcasautomobiles.com/images/ruby-yellow.png	2
16	5	Pearl White	https://varcasautomobiles.com/images/ruby.png	3
17	6	Forest Green	https://varcasautomobiles.com/images/tejasgreen.png	0
18	6	Crimson Red	https://varcasautomobiles.com/images/tejasred.png	1
19	6	Ocean Blue	https://varcasautomobiles.com/images/tejasblue.png	2
20	7	Black & Red	https://varcasautomobiles.com/images/raniblackand%20red.png	0
21	7	Pink & White	https://varcasautomobiles.com/images/rani.png	1
22	8	Red & Black	https://varcasautomobiles.com/images/ranilxred.png	0
23	8	Pink & Blue	https://varcasautomobiles.com/images/ranilxpink.png	1
24	8	Purple & White	https://varcasautomobiles.com/images/ranilx-2.png	2
25	9	Matte Black	https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop	0
26	9	Racing Red	https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&h=300&fit=crop	1
27	9	Electric Blue	https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=400&h=300&fit=crop	2
28	10	Titanium Gray	https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop	0
29	10	Pearl White	https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop	1
30	10	Neon Green	https://images.unsplash.com/photo-1558980394-4c7c9f9d9c6b?w=400&h=300&fit=crop	2
31	11	Midnight Black	https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop	0
32	11	Silver Metallic	https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop	1
33	11	Deep Burgundy	https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&h=300&fit=crop	2
34	12	Commercial White	https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop	0
35	12	Fleet Yellow	https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop	1
36	13	Industrial Gray	https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop	0
37	13	Safety Orange	https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop	1
38	14	Arctic White	https://images.unsplash.com/photo-1548262938-cf874d2bcf3b?w=400&h=300&fit=crop	0
39	14	Metro Blue	https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop	1
40	15	Logistics White	https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop	0
41	15	Enterprise Gray	https://images.unsplash.com/photo-1548262938-cf874d2bcf3b?w=400&h=300&fit=crop	1
\.


--
-- Data for Name: vehicle_smart_features; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.vehicle_smart_features (id, vehicle_id, title, description, icon, display_order) FROM stdin;
1	1	Tracking	Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.	https://varcasautomobiles.com/images/tracking.jpg	0
2	1	Reminders	Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.	https://varcasautomobiles.com/images/remainder.jpg	1
3	1	Find My Bike	Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.	https://varcasautomobiles.com/images/findmybike.jpg	2
4	1	Alerting	Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.	https://varcasautomobiles.com/images/alerting.jpg	3
5	2	Tracking	Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.	https://varcasautomobiles.com/images/tracking.jpg	0
6	2	Reminders	Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.	https://varcasautomobiles.com/images/remainder.jpg	1
7	2	Find My Bike	Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.	https://varcasautomobiles.com/images/findmybike.jpg	2
8	2	Alerting	Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.	https://varcasautomobiles.com/images/alerting.jpg	3
9	3	Tracking	Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.	https://varcasautomobiles.com/images/tracking.jpg	0
10	3	Reminders	Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.	https://varcasautomobiles.com/images/remainder.jpg	1
11	3	Find My Bike	Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.	https://varcasautomobiles.com/images/findmybike.jpg	2
12	3	Alerting	Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.	https://varcasautomobiles.com/images/alerting.jpg	3
13	4	Tracking	Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.	https://varcasautomobiles.com/images/tracking.jpg	0
14	4	Reminders	Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.	https://varcasautomobiles.com/images/remainder.jpg	1
15	4	Find My Bike	Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.	https://varcasautomobiles.com/images/findmybike.jpg	2
16	4	Alerting	Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.	https://varcasautomobiles.com/images/alerting.jpg	3
17	5	Tracking	Varcas' innovative tracking technology ensures real-time insights, enhancing safety and convenience for a connected and informed driving experience.	https://varcasautomobiles.com/images/tracking.jpg	0
18	5	Reminders	Stay on track with Varcas' smart reminders, keeping you informed and organized throughout your journey for seamless navigation and efficiency.	https://varcasautomobiles.com/images/remainder.jpg	1
19	5	Find My Bike	Discover your bike effortlessly with Varcas' Find My Bike feature, ensuring peace of mind and hassle-free retrieval wherever your adventures take you.	https://varcasautomobiles.com/images/findmybike.jpg	2
20	5	Alerting	Stay informed and secure with Varcas' Alerting feature, providing real-time notifications for enhanced safety and peace of mind on your rides.	https://varcasautomobiles.com/images/alerting.jpg	3
21	9	Ride Analytics	Track your riding patterns, battery consumption, and performance metrics through the mobile app for optimal efficiency.	https://varcasautomobiles.com/images/tracking.jpg	0
22	9	Geofencing	Set virtual boundaries and receive instant alerts when your motorcycle moves outside designated areas.	https://varcasautomobiles.com/images/alerting.jpg	1
23	9	Remote Diagnostics	Monitor battery health, motor performance, and receive maintenance reminders directly on your smartphone.	https://varcasautomobiles.com/images/remainder.jpg	2
24	9	Anti-Theft System	Advanced immobilizer and GPS tracking ensure your motorcycle stays secure with real-time theft alerts.	https://varcasautomobiles.com/images/findmybike.jpg	3
25	10	Smart Navigation	Integrated GPS navigation with turn-by-turn directions displayed on the instrument cluster.	https://varcasautomobiles.com/images/tracking.jpg	0
26	10	Smartphone Integration	Connect your phone via Bluetooth for calls, music, and navigation without taking your eyes off the road.	https://varcasautomobiles.com/images/remainder.jpg	1
27	10	Find My Bike	Locate your motorcycle instantly using GPS tracking through the mobile app.	https://varcasautomobiles.com/images/findmybike.jpg	2
28	10	Real-Time Alerts	Get instant notifications for low battery, service reminders, and security alerts.	https://varcasautomobiles.com/images/alerting.jpg	3
29	11	Advanced Telemetry	Comprehensive vehicle diagnostics and performance monitoring with cloud-based data logging.	https://varcasautomobiles.com/images/tracking.jpg	0
30	11	OTA Updates	Over-the-air firmware updates keep your motorcycle's software current with the latest features.	https://varcasautomobiles.com/images/remainder.jpg	1
31	11	Emergency SOS	One-touch emergency assistance with automatic location sharing to emergency contacts.	https://varcasautomobiles.com/images/alerting.jpg	2
32	11	Trip Planning	Plan routes with charging station locations and estimated battery consumption displayed.	https://varcasautomobiles.com/images/findmybike.jpg	3
33	12	Fleet Management	Monitor your entire fleet with real-time tracking, route optimization, and performance analytics.	https://varcasautomobiles.com/images/tracking.jpg	0
34	12	Delivery Tracking	Share live delivery status with customers and optimize routes for faster deliveries.	https://varcasautomobiles.com/images/findmybike.jpg	1
35	12	Load Monitoring	Automatic payload detection and alerts to prevent overloading and ensure safe operation.	https://varcasautomobiles.com/images/alerting.jpg	2
36	12	Maintenance Alerts	Predictive maintenance notifications help prevent downtime and reduce service costs.	https://varcasautomobiles.com/images/remainder.jpg	3
37	13	Advanced Telematics	Complete fleet visibility with geofencing, route history, and driver behavior analytics.	https://varcasautomobiles.com/images/tracking.jpg	0
38	13	Cold Chain Monitoring	Optional temperature monitoring for refrigerated cargo with real-time alerts.	https://varcasautomobiles.com/images/alerting.jpg	1
39	13	Driver Safety	Speed limiting, fatigue alerts, and emergency braking assistance for enhanced safety.	https://varcasautomobiles.com/images/remainder.jpg	2
40	13	Theft Prevention	Immobilizer, GPS tracking, and remote engine cutoff for maximum security.	https://varcasautomobiles.com/images/findmybike.jpg	3
41	14	Ride-Sharing Ready	Integrated systems for ride-sharing platforms with passenger tracking and fare calculation.	https://varcasautomobiles.com/images/tracking.jpg	0
42	14	Driver Assistance	Lane keeping assist, parking sensors, and collision warning for enhanced safety.	https://varcasautomobiles.com/images/alerting.jpg	1
43	14	Route Optimization	AI-powered route planning to minimize energy consumption and maximize efficiency.	https://varcasautomobiles.com/images/findmybike.jpg	2
44	14	Maintenance Scheduling	Automated service reminders and predictive maintenance alerts to minimize downtime.	https://varcasautomobiles.com/images/remainder.jpg	3
45	15	Fleet Command Center	Centralized management of multiple vehicles with real-time monitoring and analytics.	https://varcasautomobiles.com/images/tracking.jpg	0
46	15	Delivery Optimization	Automated route planning with multi-stop optimization and real-time traffic updates.	https://varcasautomobiles.com/images/findmybike.jpg	1
47	15	Cargo Security	Door sensors, cargo area monitoring, and tamper alerts for secure deliveries.	https://varcasautomobiles.com/images/alerting.jpg	2
48	15	Energy Management	Smart charging scheduling and energy consumption analytics to reduce operational costs.	https://varcasautomobiles.com/images/remainder.jpg	3
\.


--
-- Data for Name: vehicle_specifications; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.vehicle_specifications (id, vehicle_id, label, value, display_order) FROM stdin;
1	1	Battery Capacity	1.7 kWh	0
2	1	True Range/Charge	100 km	1
3	1	Battery Charging Time	3 hours	2
4	1	Loading Capacity	2 Adults (150 kg)	3
5	1	Wheel Size	3×10	4
6	1	Battery Type	Lithium-ion	5
7	1	Battery Swappable/Removable	Yes	6
8	1	Regenerative Braking	Yes	7
9	1	Brake	Disc	8
10	1	Anti Theft Alarm	Yes	9
11	1	Hazard Warning	Yes	10
12	1	USB Port for Mobile Charging	Yes	11
13	2	Battery Capacity	1.7 kWh	0
14	2	True Range/Charge	80-95 km	1
15	2	Battery Charging Time	3 hours	2
16	2	Loading Capacity	2 Adults (150 kg)	3
17	2	Wheel Size	3×10	4
18	2	Speed	25-45 km/h	5
19	2	Battery Type	Lithium-ion	6
20	2	Battery Swappable/Removable	Yes	7
21	2	Regenerative Braking	Yes	8
22	2	Brake	Disc	9
23	2	Anti Theft Alarm	Yes	10
24	2	Hazard Warning	Yes	11
25	2	USB Port for Mobile Charging	Yes	12
26	2	Battery Level Indicator	Yes	13
27	3	Battery Capacity	1.7 kWh	0
28	3	True Range/Charge	55 km	1
29	3	Battery Charging Time	3 hours	2
30	3	Loading Capacity	2 Adults (150 kg)	3
31	3	Wheel Size	3×10	4
32	3	Battery Type	Lithium-ion	5
33	3	Battery Swappable/Removable	Yes	6
34	3	Regenerative Braking	Yes	7
35	3	Brake	Disc	8
36	3	Anti Theft Alarm	Yes	9
37	3	Hazard Warning	Yes	10
38	3	USB Port for Mobile Charging	Yes	11
39	4	Battery Capacity	1.56 kWh	0
40	4	True Range/Charge	80-95 km	1
41	4	Battery Charging Time	3 hours	2
42	4	Loading Capacity	2 Adults (150 kg)	3
43	4	Wheel Size	3×10	4
44	4	Battery Type	Lithium-ion	5
45	4	Battery Removable	Yes	6
46	4	Regenerative Braking	Yes	7
47	4	Brake	Disc	8
48	4	Anti Theft Alarm	Yes	9
49	4	Hazard Warning	Yes	10
50	4	USB Port for Mobile Charging	Yes	11
51	4	Keyless Entry	Yes	12
52	4	Parking Switch	Yes	13
53	5	Battery Capacity	1.7 kWh	0
54	5	True Range/Charge	55 km	1
55	5	Battery Charging Time	3 hours	2
56	5	Loading Capacity	2 Adults (150 kg)	3
57	5	Wheel Size	3×10	4
58	5	Battery Type	Lithium-ion	5
59	5	Battery Swappable/Removable	Yes	6
60	5	Regenerative Braking	Yes	7
61	5	Brake	Disc	8
62	5	Anti Theft Alarm	Yes	9
63	5	Hazard Warning	Yes	10
64	5	USB Port for Mobile Charging	Yes	11
65	6	Motor Capacity	250 W	0
66	6	Speed	25 km/h	1
67	6	Battery Type	Lithium-ion	2
68	6	Battery Removable	Yes	3
69	6	Battery Level Indicator	Yes	4
70	6	Charger Auto Cut	Yes	5
71	6	Charging Time	6-7 hours	6
72	6	Pedal Assistance	Yes	7
73	6	Riding Modes	Normal, Eco, Power	8
74	6	Gear System	7 Speed - Shimano	9
75	6	Brake	Disc	10
76	6	Headlight	LED	11
77	6	Water Resistant	Yes	12
78	6	Wheel Size	26 Inch	13
79	6	Tyre	Tube	14
80	6	Loading Capacity	80 kg	15
81	7	Motor Capacity	250 W	0
82	7	True Range	30 km	1
83	7	Speed	25 km/h	2
84	7	Battery Type	Lithium-ion	3
85	7	Battery Capacity	36V 12Ah	4
86	7	Battery Removable	Yes	5
87	7	Battery Level Indicator	Yes	6
88	7	Charger Auto Cut	Yes	7
89	7	Charging Time	6-7 hours	8
90	7	Pedal Assistance	Yes	9
91	7	Riding Modes	Normal, Eco, Power	10
92	7	Gear System	7 Speed - Shimano	11
93	7	Brake	Disc	12
94	7	Headlight	LED	13
95	7	Water Resistant	Yes	14
96	7	Wheel Size	26 Inch	15
97	7	Front Basket	Yes	16
98	7	Rear Carrier	Yes	17
99	7	Loading Capacity	80 kg	18
100	8	Motor Capacity	250 W	0
101	8	True Range	40 km	1
102	8	Speed	25 km/h	2
103	8	Battery Type	Lithium-ion	3
104	8	Battery Capacity	36V 12Ah	4
105	8	Battery Removable	Yes	5
106	8	Battery Level Indicator	Yes	6
107	8	Charger Auto Cut	Yes	7
108	8	Charging Time	6-7 hours	8
109	8	Pedal Assistance	Yes	9
110	8	Gear System	No	10
111	8	Brake	Drum	11
112	8	Headlight	LED	12
113	8	Water Resistant	Yes	13
114	8	Wheel Size	26 Inch	14
115	8	Front Basket	Yes	15
116	8	Rear Seat	Yes	16
117	8	Rear Carrier	No	17
118	8	Loading Capacity	80 kg	18
119	9	Motor Power	5 kW	0
120	9	Battery Capacity	3.5 kWh	1
121	9	True Range/Charge	120 km	2
122	9	Top Speed	95 km/h	3
123	9	Battery Charging Time	4 hours	4
124	9	Battery Type	Lithium-ion	5
125	9	Battery Swappable	Yes	6
126	9	Regenerative Braking	Yes	7
127	9	Brake Type	Disc (Front & Rear)	8
128	9	Suspension	Telescopic Front, Mono Shock Rear	9
129	9	Wheel Size	17 Inch	10
130	9	Digital Display	Full LCD	11
131	9	Connectivity	Bluetooth, GPS Tracking	12
132	9	Fast Charging Support	Yes	13
133	9	Riding Modes	Eco, City, Sport	14
134	9	Loading Capacity	150 kg	15
135	10	Motor Power	3.5 kW	0
136	10	Battery Capacity	2.8 kWh	1
137	10	True Range/Charge	100 km	2
138	10	Top Speed	80 km/h	3
139	10	Battery Charging Time	3.5 hours	4
140	10	Battery Type	Lithium-ion	5
141	10	Battery Removable	Yes	6
142	10	Regenerative Braking	Yes	7
143	10	Brake Type	Disc (Front & Rear)	8
144	10	Suspension	Telescopic Front, Dual Shock Rear	9
145	10	Wheel Size	16 Inch	10
146	10	Digital Display	TFT Color Display	11
147	10	USB Charging Port	Yes	12
148	10	Keyless Entry	Yes	13
149	10	Reverse Mode	Yes	14
150	10	Loading Capacity	150 kg	15
151	11	Motor Power	6 kW	0
152	11	Battery Capacity	4.5 kWh	1
153	11	True Range/Charge	150 km	2
154	11	Top Speed	110 km/h	3
155	11	Battery Charging Time	5 hours	4
156	11	Battery Type	Lithium-ion	5
157	11	Battery Swappable	Yes	6
158	11	Regenerative Braking	Yes	7
159	11	Brake Type	ABS Disc (Front & Rear)	8
160	11	Suspension	USD Fork Front, Mono Shock Rear	9
161	11	Wheel Size	17 Inch	10
162	11	Digital Display	7-inch TFT Touchscreen	11
163	11	Cruise Control	Yes	12
164	11	Traction Control	Yes	13
165	11	Riding Modes	Eco, Normal, Sport, Custom	14
166	11	Heated Grips	Yes	15
167	11	Loading Capacity	180 kg	16
168	12	Motor Power	2.5 kW	0
169	12	Battery Capacity	3.2 kWh	1
170	12	True Range/Charge	80 km	2
171	12	Top Speed	45 km/h	3
172	12	Battery Charging Time	4 hours	4
173	12	Battery Type	Lithium-ion	5
174	12	Battery Swappable	Yes	6
175	12	Payload Capacity	300 kg	7
176	12	Cargo Bed Dimensions	1200 x 900 x 600 mm	8
177	12	Brake Type	Hydraulic Disc	9
178	12	Suspension	Heavy Duty Leaf Spring	10
179	12	Wheel Size	12 Inch	11
180	12	Digital Speedometer	Yes	12
181	12	Reverse Mode	Yes	13
182	12	Hill Hold Assist	Yes	14
183	12	Weather Protection	Cabin with Windshield	15
184	13	Motor Power	4 kW	0
185	13	Battery Capacity	5 kWh	1
186	13	True Range/Charge	100 km	2
187	13	Top Speed	50 km/h	3
188	13	Battery Charging Time	5 hours	4
189	13	Battery Type	Lithium-ion	5
190	13	Battery Swappable	Yes	6
191	13	Payload Capacity	500 kg	7
192	13	Cargo Bed Dimensions	1500 x 1100 x 700 mm	8
193	13	Brake Type	Hydraulic Disc with ABS	9
194	13	Suspension	Reinforced Heavy Duty	10
195	13	Wheel Size	14 Inch	11
196	13	Digital Display	LCD with Navigation	12
197	13	Reverse Camera	Yes	13
198	13	Parking Sensors	Yes	14
199	13	Fast Charging Support	Yes	15
200	13	Weather Protection	Fully Enclosed Cabin	16
201	14	Motor Power	8 kW	0
202	14	Battery Capacity	15 kWh	1
203	14	True Range/Charge	120 km	2
204	14	Top Speed	70 km/h	3
205	14	Battery Charging Time	6 hours	4
206	14	Battery Type	Lithium-ion	5
207	14	Seating Capacity	4+1 (Driver + 4 Passengers)	6
208	14	Cargo Volume	1.2 cubic meters	7
209	14	Payload Capacity	400 kg	8
210	14	Brake Type	Disc with ABS	9
211	14	Suspension	Independent Front, Leaf Spring Rear	10
212	14	Wheel Size	14 Inch	11
213	14	Air Conditioning	Yes	12
214	14	Power Steering	Yes	13
215	14	Digital Instrument Cluster	Yes	14
216	14	Fast Charging Support	Yes	15
217	15	Motor Power	12 kW	0
218	15	Battery Capacity	20 kWh	1
219	15	True Range/Charge	150 km	2
220	15	Top Speed	80 km/h	3
221	15	Battery Charging Time	8 hours (Normal), 3 hours (Fast)	4
222	15	Battery Type	Lithium-ion	5
223	15	Seating Capacity	2+1 (Driver + 2)	6
224	15	Cargo Volume	3.5 cubic meters	7
225	15	Payload Capacity	800 kg	8
226	15	Brake Type	Disc with ABS & EBD	9
227	15	Suspension	Heavy Duty Independent	10
228	15	Wheel Size	16 Inch	11
229	15	Cargo Door	Side & Rear Access	12
230	15	Tie-Down Points	Multiple	13
231	15	Refrigeration Ready	Yes (Optional)	14
232	15	GPS Navigation	Integrated	15
\.


--
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.vehicles (id, name, slug, tagline, description, category, main_image, front_image, status, display_order, created_at, updated_at, created_by, updated_by, key_highlights) FROM stdin;
1	FALCON	falcon	Powerful Performance, Smart Connectivity	Experience the perfect blend of performance and technology with the VARCAS Falcon. Designed for the modern commuter who demands reliability and innovation, the Falcon offers exceptional range, smart tracking features, and a sleek design that turns heads.	electric_scooters	https://varcasautomobiles.com/images/falcon_red.png	https://varcasautomobiles.com/images/falconfront.png	active	0	2025-10-21 07:08:09.604409	2025-10-21 07:08:09.604409	\N	\N	\N
2	EAGAN	eagan	Sleek Design, Superior Range	The VARCAS Eagan combines contemporary styling with practical performance. Perfect for urban environments, it delivers a smooth, efficient ride with advanced smart features that keep you connected and in control.	electric_scooters	https://varcasautomobiles.com/images/egan_prod.png	https://varcasautomobiles.com/images/eaganfront.png	active	1	2025-10-21 07:08:09.894868	2025-10-21 07:08:09.894868	\N	\N	\N
3	CRONY	crony	Compact & Vibrant City Companion	Meet the VARCAS Crony - your perfect city companion. With its vibrant color options and compact design, the Crony offers exceptional maneuverability in urban environments while maintaining the smart features you expect from VARCAS.	electric_scooters	https://varcasautomobiles.com/images/cap-img-6.png	https://varcasautomobiles.com/images/cronyfront.jpg	active	2	2025-10-21 07:08:10.158553	2025-10-21 07:08:10.158553	\N	\N	\N
4	AMAN	aman	Advanced Features, Premium Comfort	The VARCAS Aman represents the pinnacle of e-scooter innovation. With keyless entry, parking switch, and an impressive range, the Aman is designed for riders who demand the best in technology and convenience.	electric_scooters	https://varcasautomobiles.com/images/aman.png	https://varcasautomobiles.com/images/amanfrnt.png	active	3	2025-10-21 07:08:10.425461	2025-10-21 07:08:10.425461	\N	\N	\N
5	RUBY	ruby	Bold Style, Reliable Performance	The VARCAS Ruby is designed for riders who appreciate vibrant style without compromising on performance. With multiple eye-catching color options and essential smart features, the Ruby makes every ride memorable.	electric_scooters	https://varcasautomobiles.com/images/ruby.png	https://varcasautomobiles.com/images/ruby-frnt.png	active	4	2025-10-21 07:08:10.691022	2025-10-21 07:08:10.691022	\N	\N	\N
6	TEJAS-SPORT	tejas-sport	Sporty E-Cycle for Active Lifestyles	The VARCAS Tejas-Sport brings pedal-assist technology to your fitness routine. With 7-speed Shimano gears, multiple riding modes, and a sporty design, it's perfect for those who want to blend exercise with electric assistance.	electric_scooters	https://varcasautomobiles.com/images/TEJA.png	https://varcasautomobiles.com/images/TEJA.png	active	5	2025-10-21 07:08:10.95614	2025-10-21 07:08:10.95614	\N	\N	\N
7	RANI-EX	rani-ex	Elegant E-Cycle with Practical Features	The VARCAS Rani-EX is designed with elegance and practicality in mind. Featuring a front basket, rear carrier, and comfortable design, it's perfect for daily errands and leisurely rides around the neighborhood.	electric_scooters	https://varcasautomobiles.com/images/rani.png	https://varcasautomobiles.com/images/rani.png	active	6	2025-10-21 07:08:11.155744	2025-10-21 07:08:11.155744	\N	\N	\N
8	RANI-LX	rani-lx	Premium Comfort for City Riding	The VARCAS Rani-LX takes comfort and convenience to the next level. With an extended range, front basket, and rear seat, it's the ideal choice for city dwellers who want style, comfort, and practicality in one package.	electric_scooters	https://varcasautomobiles.com/images/rani-lx.png	https://varcasautomobiles.com/images/rani-lx.png	active	7	2025-10-21 07:08:11.358277	2025-10-21 07:08:11.358277	\N	\N	\N
9	THUNDER 350	thunder-350	Power Meets Performance	The VARCAS Thunder 350 redefines electric motorcycling with its powerful motor, extended range, and premium features. Built for the enthusiast who craves performance without compromising on sustainability, this motorcycle offers an exhilarating riding experience with cutting-edge technology.	electric_scooters	https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop	https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&h=600&fit=crop	active	8	2025-10-21 07:08:11.556598	2025-10-21 07:08:11.556598	\N	\N	\N
10	VOLT SPORT	volt-sport	Urban Agility, Electric Efficiency	The VARCAS Volt Sport is engineered for the urban commuter seeking a perfect balance of agility and range. With its lightweight frame, responsive handling, and smart connectivity features, it makes city navigation effortless while delivering impressive performance and style.	electric_scooters	https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop	https://images.unsplash.com/photo-1609630875085-c7be96596c61?w=800&h=600&fit=crop	active	9	2025-10-21 07:08:11.823123	2025-10-21 07:08:11.823123	\N	\N	\N
11	CRUISER PRO	cruiser-pro	Long Range, Premium Comfort	Experience the ultimate in electric cruising with the VARCAS Cruiser Pro. Designed for long-distance touring with superior comfort, this premium electric motorcycle features advanced suspension, extended battery capacity, and luxury appointments for riders who demand the best.	electric_scooters	https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop	https://images.unsplash.com/photo-1558618666-b47e11cea59e?w=800&h=600&fit=crop	active	10	2025-10-21 07:08:12.087576	2025-10-21 07:08:12.087576	\N	\N	\N
12	CARGO LITE	cargo-lite	Efficient Last-Mile Delivery Solution	The VARCAS Cargo Lite three-wheeler is purpose-built for urban delivery and logistics. With its spacious cargo bed, efficient electric motor, and compact design, it's the perfect solution for businesses looking to reduce operating costs while maintaining reliable delivery performance.	electric_scooters	https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop	https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop	active	11	2025-10-21 07:08:12.354186	2025-10-21 07:08:12.354186	\N	\N	\N
13	CARGO MAX	cargo-max	Heavy-Duty Electric Cargo Champion	The VARCAS Cargo Max is engineered for demanding commercial applications. With enhanced payload capacity, robust construction, and advanced safety features, this three-wheeler handles heavy loads with ease while delivering exceptional energy efficiency and low maintenance costs.	electric_scooters	https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop	https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop	active	12	2025-10-21 07:08:12.623631	2025-10-21 07:08:12.623631	\N	\N	\N
14	TRANSPORTER CITY	transporter-city	Urban Mobility for Passengers & Goods	The VARCAS Transporter City is a versatile four-wheeler designed for urban passenger transport and light cargo applications. With comfortable seating, ample cargo space, and efficient electric drivetrain, it's ideal for ride-sharing services, local transport, and small business logistics.	electric_scooters	https://images.unsplash.com/photo-1548262938-cf874d2bcf3b?w=800&h=600&fit=crop	https://images.unsplash.com/photo-1548262938-cf874d2bcf3b?w=800&h=600&fit=crop	active	13	2025-10-21 07:08:12.889766	2025-10-21 07:08:12.889766	\N	\N	\N
15	TRANSPORTER CARGO	transporter-cargo	Maximum Capacity, Minimum Operating Cost	The VARCAS Transporter Cargo is engineered for serious commercial operations. With its massive cargo capacity, reinforced chassis, and powerful electric motor, it handles the toughest delivery challenges while significantly reducing fuel costs and emissions compared to traditional vehicles.	electric_scooters	https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop	https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop	active	14	2025-10-21 07:08:13.155444	2025-10-21 07:08:13.155444	\N	\N	\N
16	Test Scooter lcj4P4	test-scooter-lcj4p4	Fast and Efficient	A test electric scooter for testing purposes	electric_scooters			active	0	2025-10-21 12:04:53.350545	2025-10-21 12:04:53.350545	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	\N	\N
17	Test Scooter gjpLns	test-scooter-gjplns	Fast and Efficient Test	A test electric scooter for automated testing	electric_scooters	\N	\N	active	0	2025-10-21 12:09:21.48825	2025-10-21 12:09:21.48825	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	\N	\N
19	GPS tracking enabled	120	80	A test vehicle with specifications	electric_scooters	\N	Anti-theft alarm system	active	0	2025-10-22 14:51:29.102041	2025-10-22 14:53:43.65	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	\N
20	Test E-Bike Q30xNj	test-ebike-q30xnj	Smart and Connected	A test vehicle with specifications	electric_scooters	\N	\N	active	0	2025-10-22 15:05:21.176694	2025-10-22 15:12:58.67	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	f2bec605-1ee5-4f4c-99d2-e95e77da68a5	{"Regenerative braking system","Smart battery management","GPS tracking enabled","Anti-theft alarm system"}
\.


--
-- Name: company_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.company_info_id_seq', 1, true);


--
-- Name: company_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.company_values_id_seq', 4, true);


--
-- Name: dealers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.dealers_id_seq', 3, true);


--
-- Name: dynamic_pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.dynamic_pages_id_seq', 2, true);


--
-- Name: environmental_impacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.environmental_impacts_id_seq', 6, true);


--
-- Name: faq_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.faq_categories_id_seq', 5, true);


--
-- Name: faq_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.faq_questions_id_seq', 15, true);


--
-- Name: form_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.form_submissions_id_seq', 1, false);


--
-- Name: hero_slides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.hero_slides_id_seq', 4, true);


--
-- Name: job_openings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.job_openings_id_seq', 6, true);


--
-- Name: joint_ventures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.joint_ventures_id_seq', 1, true);


--
-- Name: media_library_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.media_library_id_seq', 1, false);


--
-- Name: press_articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.press_articles_id_seq', 6, true);


--
-- Name: seo_metadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.seo_metadata_id_seq', 1, false);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 1, false);


--
-- Name: smart_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.smart_features_id_seq', 6, true);


--
-- Name: stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.stats_id_seq', 4, true);


--
-- Name: strategic_partners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.strategic_partners_id_seq', 3, true);


--
-- Name: team_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.team_members_id_seq', 13, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 3, true);


--
-- Name: vehicle_colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vehicle_colors_id_seq', 41, true);


--
-- Name: vehicle_smart_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vehicle_smart_features_id_seq', 48, true);


--
-- Name: vehicle_specifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vehicle_specifications_id_seq', 238, true);


--
-- Name: vehicles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.vehicles_id_seq', 20, true);


--
-- Name: company_info company_info_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.company_info
    ADD CONSTRAINT company_info_pkey PRIMARY KEY (id);


--
-- Name: company_values company_values_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.company_values
    ADD CONSTRAINT company_values_pkey PRIMARY KEY (id);


--
-- Name: dealers dealers_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dealers
    ADD CONSTRAINT dealers_pkey PRIMARY KEY (id);


--
-- Name: dynamic_pages dynamic_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dynamic_pages
    ADD CONSTRAINT dynamic_pages_pkey PRIMARY KEY (id);


--
-- Name: dynamic_pages dynamic_pages_slug_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dynamic_pages
    ADD CONSTRAINT dynamic_pages_slug_unique UNIQUE (slug);


--
-- Name: environmental_impacts environmental_impacts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.environmental_impacts
    ADD CONSTRAINT environmental_impacts_pkey PRIMARY KEY (id);


--
-- Name: faq_categories faq_categories_name_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faq_categories
    ADD CONSTRAINT faq_categories_name_unique UNIQUE (name);


--
-- Name: faq_categories faq_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faq_categories
    ADD CONSTRAINT faq_categories_pkey PRIMARY KEY (id);


--
-- Name: faq_questions faq_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faq_questions
    ADD CONSTRAINT faq_questions_pkey PRIMARY KEY (id);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: hero_slides hero_slides_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.hero_slides
    ADD CONSTRAINT hero_slides_pkey PRIMARY KEY (id);


--
-- Name: job_openings job_openings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_openings
    ADD CONSTRAINT job_openings_pkey PRIMARY KEY (id);


--
-- Name: joint_ventures joint_ventures_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.joint_ventures
    ADD CONSTRAINT joint_ventures_pkey PRIMARY KEY (id);


--
-- Name: media_library media_library_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (id);


--
-- Name: press_articles press_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.press_articles
    ADD CONSTRAINT press_articles_pkey PRIMARY KEY (id);


--
-- Name: seo_metadata seo_metadata_page_path_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.seo_metadata
    ADD CONSTRAINT seo_metadata_page_path_unique UNIQUE (page_path);


--
-- Name: seo_metadata seo_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.seo_metadata
    ADD CONSTRAINT seo_metadata_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_key_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_unique UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: smart_features smart_features_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.smart_features
    ADD CONSTRAINT smart_features_pkey PRIMARY KEY (id);


--
-- Name: stats stats_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_pkey PRIMARY KEY (id);


--
-- Name: strategic_partners strategic_partners_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.strategic_partners
    ADD CONSTRAINT strategic_partners_pkey PRIMARY KEY (id);


--
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: vehicle_colors vehicle_colors_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_colors
    ADD CONSTRAINT vehicle_colors_pkey PRIMARY KEY (id);


--
-- Name: vehicle_smart_features vehicle_smart_features_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_smart_features
    ADD CONSTRAINT vehicle_smart_features_pkey PRIMARY KEY (id);


--
-- Name: vehicle_specifications vehicle_specifications_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_specifications
    ADD CONSTRAINT vehicle_specifications_pkey PRIMARY KEY (id);


--
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


--
-- Name: vehicles vehicles_slug_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_slug_unique UNIQUE (slug);


--
-- Name: company_info company_info_updated_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.company_info
    ADD CONSTRAINT company_info_updated_by_users_id_fk FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: dealers dealers_created_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dealers
    ADD CONSTRAINT dealers_created_by_users_id_fk FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: dynamic_pages dynamic_pages_created_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dynamic_pages
    ADD CONSTRAINT dynamic_pages_created_by_users_id_fk FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: dynamic_pages dynamic_pages_updated_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.dynamic_pages
    ADD CONSTRAINT dynamic_pages_updated_by_users_id_fk FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: faq_questions faq_questions_category_id_faq_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faq_questions
    ADD CONSTRAINT faq_questions_category_id_faq_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.faq_categories(id) ON DELETE CASCADE;


--
-- Name: form_submissions form_submissions_responded_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_responded_by_users_id_fk FOREIGN KEY (responded_by) REFERENCES public.users(id);


--
-- Name: job_openings job_openings_created_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_openings
    ADD CONSTRAINT job_openings_created_by_users_id_fk FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: media_library media_library_uploaded_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_uploaded_by_users_id_fk FOREIGN KEY (uploaded_by) REFERENCES public.users(id);


--
-- Name: press_articles press_articles_created_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.press_articles
    ADD CONSTRAINT press_articles_created_by_users_id_fk FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: seo_metadata seo_metadata_updated_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.seo_metadata
    ADD CONSTRAINT seo_metadata_updated_by_users_id_fk FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: site_settings site_settings_updated_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_updated_by_users_id_fk FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: vehicle_colors vehicle_colors_vehicle_id_vehicles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_colors
    ADD CONSTRAINT vehicle_colors_vehicle_id_vehicles_id_fk FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: vehicle_smart_features vehicle_smart_features_vehicle_id_vehicles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_smart_features
    ADD CONSTRAINT vehicle_smart_features_vehicle_id_vehicles_id_fk FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: vehicle_specifications vehicle_specifications_vehicle_id_vehicles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicle_specifications
    ADD CONSTRAINT vehicle_specifications_vehicle_id_vehicles_id_fk FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: vehicles vehicles_created_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_created_by_users_id_fk FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: vehicles vehicles_updated_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_updated_by_users_id_fk FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

