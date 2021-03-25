module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "org.oladayo.pdfkit",
        copyright: "©2021 OTech Labs, Inc.",
        nsis: {
          createDesktopShortcut: "always",
        },
      },
    },
  },
};
