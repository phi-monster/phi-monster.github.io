--------------------------------------------------------------------------------
-- site.hs — Hakyll generator for Φ(fight) Research.
--
-- Build:    nix-shell --run "runghc site.hs build"
-- Watch:    nix-shell --run "runghc site.hs watch"
-- Clean:    nix-shell --run "runghc site.hs clean"
--------------------------------------------------------------------------------

{-# LANGUAGE OverloadedStrings #-}

import           Hakyll
import           Data.Monoid (mappend)


main :: IO ()
main = hakyll $ do

    -- CNAME for the custom domain (Φ.monster apex).
    -- Must end up at the root of _site/ for GitHub Pages to pick it up.
    match "CNAME" $ do
        route   idRoute
        compile copyFileCompiler

    match "css/*" $ do
        route   idRoute
        compile compressCssCompiler

    match "static/**" $ do
        route   idRoute
        compile copyFileCompiler

    match "templates/*" $ compile templateBodyCompiler

    -- Home page.
    match "content/index.md" $ do
        route   $ constRoute "index.html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "templates/default.html" siteCtx
            >>= relativizeUrls

    -- People pages: content/people/<handle>.md → /people/<handle>.html
    match "content/people/*.md" $ do
        route   $ gsubRoute "content/" (const "")
                  `composeRoutes` setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "templates/default.html" siteCtx
            >>= relativizeUrls


siteCtx :: Context String
siteCtx =
    constField "site_title"  "Φ(fight) Research"             `mappend`
    constField "site_domain" "Φ.monster"                     `mappend`
    defaultContext
