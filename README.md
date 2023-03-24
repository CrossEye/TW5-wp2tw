WordPress to TiddlyWiki
=======================

Converts a CSV-formatted WordPress extract into a JSON file suitable for import into a TiddlyWiki.

It strips out wp-specific comments, formats the tags for Tiddlywiki, adds Tiddlywiki-style `created` and `modified` fields, but also keeps the original WordPress `YYYY-MM-DD` field as `date`, and renames a few fields for TW integration.


Installation
------------

```shell
> git clone https://github.com/CrossEye/TW5-wp2tw
> cd TW5-wp2tw
> npm install
```

Usage
-----

```shell
> node path/to/TW5-wptw path/to/input.csv path/to/output.json
```

Drag the resulting output file onto the desired TiddlyWiki (possibly an empty one)


A note on Dates
---------------

This script ([`index.js`][in]) converts the Wordpress plain Date format (YYYY-MM-DD) into a TiddlyWiki-style timestamp (an ISO date shorn of all non-digit characters).  But there is a mismatch, and it's fairly fundamental.  The WordPress format represents a calendar date, regardless of time-zone.  The Tiddlywiki style represents an instant in time; it's usual display takes into account the current timezone.  

This script creates a TW date at noon GMT on the day WordPress.  This should make it so the day is the right time most everywhere, but the hour and minute of claimed posting will be related to the user's current
time zone.  

The script also includes the original WordPress value in the field `date`, and adds a `wordpress-sourced` field with value `yes`, if you need to handle these tiddlers separately.



  [in]: ./index.js