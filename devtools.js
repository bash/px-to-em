var getProperties = function() {
  if (typeof $0 === 'undefined') {
    return
  }

  const computedStyle = window.getComputedStyle($0)
  const fontSize = Number.parseFloat(computedStyle.fontSize)

  const parentStyle = window.getComputedStyle($0.parentNode)
  const baseFontSize = Number.parseFloat(parentStyle.fontSize)

  const emSize = Math.round(fontSize / baseFontSize * 10000) / 10000
  const result = Object.create(null)

  result.$0 = $0
  result.fontSizePx = `${fontSize}px`
  result.baseFontSize = `${baseFontSize}px`
  result.fontSizeEm = `${emSize}em`

  return result
}

chrome.devtools.panels.elements.createSidebarPane('Px to Em', (sidebar) => {
    const updateElementProperties = () => sidebar.setExpression("(" + getProperties.toString() + ")()")

    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties)
    updateElementProperties()
})