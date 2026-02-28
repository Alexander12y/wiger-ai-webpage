-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('PENDING', 'REVIEWED', 'RESPONDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "AdminAction" AS ENUM ('LOGIN', 'LOGOUT', 'UPLOAD_MEDIA', 'DELETE_MEDIA', 'VIEW_CONTACT', 'UPDATE_CONTACT_STATUS', 'VIEW_ANALYTICS', 'CREATE_ADMIN', 'DEACTIVATE_ADMIN');

-- CreateEnum
CREATE TYPE "AnalyticsEventType" AS ENUM ('CTA_CLICK', 'VIDEO_PLAY', 'VIDEO_PAUSE', 'FORM_START', 'FORM_SUBMIT', 'SECTION_VIEW', 'NAV_CLICK', 'OUTBOUND_LINK');

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "session_id" TEXT,
    "country" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_sessions" (
    "id" TEXT NOT NULL,
    "ip_hash" TEXT NOT NULL,
    "user_agent" TEXT,
    "device" TEXT,
    "os" TEXT,
    "browser" TEXT,
    "country" TEXT,
    "city" TEXT,
    "page_count" INTEGER NOT NULL DEFAULT 0,
    "duration_sec" INTEGER,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "visitor_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "event_type" "AnalyticsEventType" NOT NULL,
    "path" TEXT NOT NULL,
    "label" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "session_id" TEXT,
    "ip_hash" TEXT,
    "country" TEXT,
    "notes" TEXT,
    "responded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_activity_logs" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "action" "AdminAction" NOT NULL,
    "target_type" TEXT,
    "target_id" TEXT,
    "metadata" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "page_views_path_idx" ON "page_views"("path");

-- CreateIndex
CREATE INDEX "page_views_created_at_idx" ON "page_views"("created_at");

-- CreateIndex
CREATE INDEX "page_views_session_id_idx" ON "page_views"("session_id");

-- CreateIndex
CREATE INDEX "visitor_sessions_ip_hash_idx" ON "visitor_sessions"("ip_hash");

-- CreateIndex
CREATE INDEX "visitor_sessions_started_at_idx" ON "visitor_sessions"("started_at");

-- CreateIndex
CREATE INDEX "visitor_sessions_country_idx" ON "visitor_sessions"("country");

-- CreateIndex
CREATE INDEX "analytics_events_event_type_idx" ON "analytics_events"("event_type");

-- CreateIndex
CREATE INDEX "analytics_events_session_id_idx" ON "analytics_events"("session_id");

-- CreateIndex
CREATE INDEX "analytics_events_created_at_idx" ON "analytics_events"("created_at");

-- CreateIndex
CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions"("status");

-- CreateIndex
CREATE INDEX "contact_submissions_email_idx" ON "contact_submissions"("email");

-- CreateIndex
CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_username_key" ON "admin_users"("username");

-- CreateIndex
CREATE INDEX "admin_users_email_idx" ON "admin_users"("email");

-- CreateIndex
CREATE INDEX "admin_users_is_active_idx" ON "admin_users"("is_active");

-- CreateIndex
CREATE INDEX "admin_activity_logs_admin_id_idx" ON "admin_activity_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admin_activity_logs_action_idx" ON "admin_activity_logs"("action");

-- CreateIndex
CREATE INDEX "admin_activity_logs_created_at_idx" ON "admin_activity_logs"("created_at");

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "visitor_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_activity_logs" ADD CONSTRAINT "admin_activity_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
