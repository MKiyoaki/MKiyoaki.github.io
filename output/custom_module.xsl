<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:f="http://www.forester-notes.org">

  <xsl:template match="f:education-block">
    <div class="education-block">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="f:school">
    <div class="school-name">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="f:duration">
    <div class="duration">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="f:degree">
    <div class="degree">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="f:location">
    <div class="location">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="f:details">
    <div class="details">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

</xsl:stylesheet>