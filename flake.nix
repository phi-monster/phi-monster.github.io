{
  description = "Liu Yuchen — personal site (Hakyll)";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      forAllSystems = f: nixpkgs.lib.genAttrs
        [ "aarch64-darwin" "x86_64-darwin" "aarch64-linux" "x86_64-linux" ]
        (system: f (import nixpkgs { inherit system; }));
    in {
      devShells = forAllSystems (pkgs:
        let
          ghc = pkgs.haskellPackages.ghcWithPackages (ps: [ ps.hakyll ]);
        in {
          default = pkgs.mkShell {
            buildInputs = [
              ghc
              pkgs.cabal-install
            ];
          };
        });
    };
}
