SELECT
    pgs.PG1,
    pgs.PG2,
    sgs.SG1,
    sgs.SG2,
    sfs.SF1,
    sfs.SF2,
    pfs.PF1,
    pfs.PF2,
    cs.C,
    pgs.PGS_PTS + sgs.SGS_PTS + pfs.PFS_PTS+ sfs.SFS_PTS+ cs.CS_PTS as FD_PTS
FROM
    ((SELECT
        t1.id AS PG1,
            t2.id AS PG2,
            t1.proj_score + t2.proj_score AS PGS_PTS
    FROM
        players_v AS t1
    CROSS JOIN players_v AS t2
    WHERE
        t1.id < t2.id AND t2.pos = 'PG'
            AND t1.pos = 'PG'
            AND t1.proj_score > 0
            AND t2.proj_score > 0) AS pgs
    CROSS JOIN (SELECT
        t1.id AS SG1,
            t2.id AS SG2,
            t1.proj_score + t2.proj_score AS SGS_PTS
    FROM
        players_v AS t1
    CROSS JOIN players_v AS t2
    WHERE
        t1.id < t2.id AND t2.pos = 'SG'
            AND t1.pos = 'SG'
            AND t1.proj_score > 0
            AND t2.proj_score > 0) AS sgs
    CROSS JOIN (SELECT
        t1.id AS SF1,
            t2.id AS SF2,
            t1.proj_score + t2.proj_score AS SFS_PTS
    FROM
        players_v AS t1
    CROSS JOIN players_v AS t2
    WHERE
        t1.id < t2.id AND t2.pos = 'SF'
            AND t1.pos = 'SF'
            AND t1.proj_score > 0
            AND t2.proj_score > 0) AS sfs
    CROSS JOIN (SELECT
        t1.id AS PF1,
            t2.id AS PF2,
            t1.proj_score + t2.proj_score AS PFS_PTS
    FROM
        players_v AS t1
    CROSS JOIN players_v AS t2
    WHERE
        t1.id < t2.id AND t2.pos = 'PF'
            AND t1.pos = 'PF'
            AND t1.proj_score > 0
            AND t2.proj_score > 0) AS pfs
    CROSS JOIN (SELECT
        players_v.id AS C, players_v.proj_score AS CS_PTS
    FROM
        players_v
    WHERE
        players_v.pos = 'C'
            AND players_v.proj_score > 0) AS cs)
WHERE
    PGS_PTS + SGS_PTS + PFS_PTS + SFS_PTS + CS_PTS > 50
ORDER BY FD_PTS
LIMIT 100;

DROP VIEW players_v;
