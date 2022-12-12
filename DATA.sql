--------------------------------------------------------
--  File created - Friday-December-09-2022   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table DATA
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."DATA" 
   (	"SBD" NUMBER(38,0), 
	"TOÁN" NUMBER(4,2), 
	"V?N" NUMBER(4,2), 
	"ANH" NUMBER(4,2), 
	"LÍ" NUMBER(4,2), 
	"HÓA" NUMBER(4,2), 
	"SINH" NUMBER(4,2), 
	"S?" NUMBER(4,2), 
	"??A" NUMBER(4,2), 
	"GDCD" NUMBER(4,2)
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" 
  NO INMEMORY ("SBD") ;
--------------------------------------------------------
--  Constraints for Table DATA
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."DATA" MODIFY ("SBD" NOT NULL ENABLE);
