import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'wouter'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage } from './pages/AboutPage'
import { BookPage } from './pages/BookPage'
import { ContactPage } from './pages/ContactPage'
import { BaxterPage } from './pages/BaxterPage'
import { MeetTheAgents } from './pages/MeetTheAgents'
import { OlliePage } from './pages/OlliePage'
import { TeddyPage } from './pages/TeddyPage'
import { AssessmentPage } from './pages/services/AssessmentPage'
import { OperationsDiagnosticPage } from './pages/services/OperationsDiagnosticPage'
import { OperationalAIAssessmentPage } from './pages/services/OperationalAIAssessmentPage'

const SITE_TITLE = 'A W Greber Consulting'

const ROUTE_TITLES: Record<string, string> = {
  '/': SITE_TITLE,
  '/about': `About | ${SITE_TITLE}`,
  '/services': `Services | ${SITE_TITLE}`,
  '/services/assessment': `Assessment | ${SITE_TITLE}`,
  '/services/operations-diagnostic': `Operations Diagnostic | ${SITE_TITLE}`,
  '/services/operational-ai-assessment': `Operational AI Assessment | ${SITE_TITLE}`,
  '/teddy': `Teddy | ${SITE_TITLE}`,
  '/meet-the-agents': `Meet the Agents | ${SITE_TITLE}`,
  '/ollie': `Ollie | ${SITE_TITLE}`,
  '/baxter': `Baxter | ${SITE_TITLE}`,
  '/contact': `Contact | ${SITE_TITLE}`,
  '/book': `Book a call | ${SITE_TITLE}`,
}

function normalizePath(path: string): string {
  const base = path.split('?')[0] ?? '/'
  if (base === '' || base === '/') return '/'
  return base.replace(/\/+$/, '') || '/'
}

function DocumentTitleSync() {
  const [location] = useLocation()
  useEffect(() => {
    const path = normalizePath(location)
    document.title = ROUTE_TITLES[path] ?? SITE_TITLE
  }, [location])
  return null
}

function App() {
  return (
    <div className="app-shell">
      <DocumentTitleSync />
      <main className="site-main">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/meet-the-agents" component={MeetTheAgents} />
          <Route path="/teddy" component={TeddyPage} />
          <Route path="/ollie" component={OlliePage} />
          <Route path="/baxter" component={BaxterPage} />
          <Route path="/services/assessment" component={AssessmentPage} />
          <Route path="/services/operations-diagnostic" component={OperationsDiagnosticPage} />
          <Route path="/services/operational-ai-assessment" component={OperationalAIAssessmentPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/book" component={BookPage} />
          <Route path="/contact" component={ContactPage} />
          <Route>Page not found.</Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
