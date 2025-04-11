-- Database creation
CREATE DATABASE cadviewer;

-- Connect to the newly created database before running the following

-- File table (CadFile model)
CREATE TABLE "CadFiles" (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE
);

-- Block table (Block model)
CREATE TABLE "Blocks" (
    id SERIAL PRIMARY KEY,
    "fileId" INTEGER REFERENCES "CadFiles"(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    layer VARCHAR(255),
    type VARCHAR(100),
    coordinates JSONB,
    properties JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_blocks_file_id ON "Blocks"("fileId");
CREATE INDEX idx_blocks_name ON "Blocks"(name);
